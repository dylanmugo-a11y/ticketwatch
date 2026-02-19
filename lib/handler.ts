import { parseIntent } from './parser';
import {
  createUser,
  getUserTier,
  countActiveWatches,
  createWatch,
  getUserWatches,
  cancelWatch,
  getConversationState,
  setConversationState,
} from './mongodb';
import { searchEvents, formatEvent, checkAvailability } from './ticketmaster';

const FREE_TIER_MAX_WATCHES = 1;

export async function handleMessage(userId: string, phone: string, messageText: string): Promise<string> {
  // Ensure user exists
  await createUser(userId, phone);

  // Check for pending conversation state (e.g. watch confirmation)
  const state = await getConversationState(userId);
  if (state?.action === 'confirm_watch') {
    const intent = parseIntent(messageText);
    if (intent.intent === 'confirm') {
      return handleWatchConfirm(userId, state.data);
    } else if (intent.intent === 'deny') {
      await setConversationState(userId, null);
      return 'No worries, watch cancelled. Send another message anytime!';
    }
    // If they said something else, clear state and process normally
    await setConversationState(userId, null);
  }

  // Parse intent
  const intentResult = parseIntent(messageText);

  switch (intentResult.intent) {
    case 'search':
      return handleSearch(intentResult);
    case 'watch':
      return handleWatch(userId, intentResult);
    case 'list':
      return handleList(userId);
    case 'cancel':
      return handleCancel(userId, intentResult);
    case 'status':
      return handleStatus(userId);
    case 'help':
      return handleHelp();
    default:
      return "Sorry, I didn't understand that. Send 'help' to see what I can do.";
  }
}

async function handleSearch(intentResult: any): Promise<string> {
  const query = intentResult.query;
  if (!query) return 'What events are you looking for?';

  const events = await searchEvents(query, 5);
  if (!events.length) {
    return `No events found for '${query}'. Try a different artist or venue name.`;
  }

  const formatted = events.slice(0, 5).map(formatEvent).filter(Boolean);
  const lines = [`Found ${formatted.length} events:\n`];

  formatted.forEach((event, i) => {
    if (!event) return;
    const statusIcon = event.status === 'onsale' ? '[ON SALE]' : '[OFF SALE]';
    const price = event.priceMin ? `€${event.priceMin}-€${event.priceMax}` : 'TBA';
    lines.push(
      `${i + 1}. *${event.name}*\n` +
        `   ${event.venue}, ${event.city}\n` +
        `   ${event.date} ${event.time}\n` +
        `   ${price}\n` +
        `   ${statusIcon}`
    );
  });

  lines.push("\nWant to watch for any of these? Say 'watch for [event] under €[price]'");
  return lines.join('\n');
}

async function handleWatch(userId: string, intentResult: any): Promise<string> {
  if (intentResult.needsClarification) {
    return intentResult.clarificationMessage || 'What event do you want to watch for?';
  }

  const eventName = intentResult.eventName;
  const maxPrice = intentResult.maxPrice;
  const quantity = intentResult.quantity || 1;

  // Check tier limits
  const tier = await getUserTier(userId);
  const activeCount = await countActiveWatches(userId);

  if (tier === 'free' && activeCount >= FREE_TIER_MAX_WATCHES) {
    return `You're on the free tier (max 1 watch). You already have ${activeCount} active watch. Cancel one or upgrade to Premium (€4.99/mo) for unlimited watches.`;
  }

  // Search for the event
  const events = await searchEvents(eventName, 3);
  if (!events.length) {
    return `Couldn't find '${eventName}'. Check spelling or try searching first.`;
  }

  const event = events[0];
  const fmt = formatEvent(event);
  if (!fmt) return 'Error processing event data. Try again.';

  const price = fmt.priceMin ? ` (currently €${fmt.priceMin}-€${fmt.priceMax})` : '';
  const maxPriceInfo = maxPrice ? ` under €${maxPrice}` : '';

  // Store confirmation state
  await setConversationState(userId, {
    action: 'confirm_watch',
    data: {
      eventId: event.id,
      eventName: fmt.name,
      venue: fmt.venue,
      date: fmt.date,
      maxPrice,
      quantity,
      buyUrl: fmt.url,
    },
  });

  return (
    `Confirm your watch:\n\n` +
    `*${fmt.name}*${price}\n` +
    `${fmt.venue} (${fmt.city})\n` +
    `${fmt.date}\n` +
    `Alert me for ${quantity}x tickets${maxPriceInfo}\n` +
    `Current status: ${fmt.status}\n\n` +
    `Reply with 'yes' to confirm or 'no' to skip.`
  );
}

async function handleWatchConfirm(userId: string, data: any): Promise<string> {
  await setConversationState(userId, null);

  const watchId = await createWatch(
    userId,
    data.eventId,
    data.eventName,
    data.venue,
    data.date,
    data.maxPrice,
    data.quantity,
    data.buyUrl
  );

  if (!watchId) {
    return `You're already watching ${data.eventName}. Cancel it first if you want to change the price.`;
  }

  const priceInfo = data.maxPrice ? ` under €${data.maxPrice}` : '';
  return (
    `Watch created for ${data.eventName}!\n` +
    `I'll alert you on WhatsApp when ${data.quantity}x ticket(s) are available${priceInfo}.\n\n` +
    `Reply with 'my watches' to see your active watches.`
  );
}

async function handleList(userId: string): Promise<string> {
  const watches = await getUserWatches(userId, 'active');

  if (!watches.length) {
    return "You don't have any active watches.\nStart with: 'Watch for [event] under €[price]'";
  }

  const lines = ['Your active watches:\n'];
  watches.forEach((w) => {
    const priceInfo = w.maxPrice ? ` (max €${w.maxPrice})` : '';
    const created = new Date(w.createdAt).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' });
    lines.push(`- ${w.eventName}${priceInfo}\n  ${w.quantity}x tickets, created ${created}`);
  });

  lines.push("\nReply 'cancel [event]' to remove a watch.");
  return lines.join('\n');
}

async function handleCancel(userId: string, intentResult: any): Promise<string> {
  if (intentResult.needsClarification) {
    return "Which watch do you want to cancel?\nReply with: 'cancel [event name]'";
  }

  const eventName = intentResult.eventName;
  const watches = await getUserWatches(userId, 'active');
  const match = watches.find((w) => w.eventName.toLowerCase().includes(eventName.toLowerCase()));

  if (!match) {
    return `Didn't find a watch for '${eventName}'.\nReply 'my watches' to see your active ones.`;
  }

  await cancelWatch(match._id.toString());
  return `Cancelled watch for ${match.eventName}.`;
}

async function handleStatus(userId: string): Promise<string> {
  const watches = await getUserWatches(userId, 'active');

  if (!watches.length) {
    return "You don't have any active watches yet.";
  }

  const lines = ['Checking your watches...\n'];

  for (const watch of watches) {
    const result = await checkAvailability(watch.eventId, watch.maxPrice, watch.quantity);
    if (result.available) {
      lines.push(
        `*${watch.eventName}* - TICKETS AVAILABLE!\n` +
          `   Price: €${result.price}\n` +
          `   ${result.details}`
      );
    } else {
      lines.push(`${watch.eventName}: ${result.details}`);
    }
  }

  return lines.join('\n');
}

function handleHelp(): string {
  return (
    '*TicketWatch Help*\n\n' +
    'I help you find and watch for sold-out concert tickets in Ireland!\n\n' +
    '*Commands:*\n' +
    '- "Watch for [artist] under €[price]" - Create a ticket watch\n' +
    '- "My watches" - See your active watches\n' +
    '- "Cancel [artist]" - Remove a watch\n' +
    '- "[Artist name]" - Search for events\n' +
    '- "Any updates?" - Check your watches for new tickets\n\n' +
    '*Pricing:*\n' +
    'Free: 1 active watch\n' +
    'Premium (€4.99/mo): Unlimited watches\n\n' +
    "Say 'watch for Bicep under €75' to start!"
  );
}
