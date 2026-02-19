export interface ParsedIntent {
  intent: string;
  confidence: number;
  eventName?: string | null;
  maxPrice?: number | null;
  quantity?: number | null;
  query?: string;
  needsClarification: boolean;
  clarificationMessage?: string | null;
}

export function parseIntent(message: string): ParsedIntent {
  const msgLower = message.toLowerCase().trim();

  if (['watch', 'alert', 'notify', 'tell me when', 'let me know when'].some((w) => msgLower.includes(w))) {
    return parseWatchIntent(message);
  }
  if (['cancel', 'stop', 'remove', 'unwatch'].some((w) => msgLower.includes(w))) {
    return parseCancelIntent(message);
  }
  if (['my watches', 'list', 'what am i', 'check my', 'active'].some((w) => msgLower.includes(w))) {
    return { intent: 'list', confidence: 0.9, needsClarification: false };
  }
  if (['update', 'any', 'news', 'status', 'tickets available'].some((w) => msgLower.includes(w))) {
    return { intent: 'status', confidence: 0.8, needsClarification: false };
  }
  if (['yes', 'yeah', 'yep', 'confirm', 'go ahead', 'do it'].some((w) => msgLower.includes(w))) {
    return { intent: 'confirm', confidence: 0.9, needsClarification: false };
  }
  if (['no', 'nah', 'nevermind', 'skip'].some((w) => msgLower.includes(w))) {
    return { intent: 'deny', confidence: 0.9, needsClarification: false };
  }
  if (['gig', 'concert', 'event', 'playing', "what's", 'show', 'tour'].some((w) => msgLower.includes(w))) {
    return { intent: 'search', confidence: 0.7, query: message, needsClarification: false };
  }
  if (['help', 'how', '?'].some((w) => msgLower.includes(w))) {
    return { intent: 'help', confidence: 0.9, needsClarification: false };
  }

  // Default: treat as search
  return {
    intent: 'search',
    confidence: 0.5,
    query: message,
    needsClarification: false,
  };
}

function parseWatchIntent(message: string): ParsedIntent {
  const match = message.match(
    /(?:watch|alert|notify)(?:\s+(?:for|me|when))?\s+(?:(\d+)\s+)?(?:tickets?\s+)?(?:for\s+)?(?:to\s+)?([^€\n]+?)(?:\s+(?:under|below|max|less than|<)?\s*€?(\d+))?$/i
  );

  let eventName: string | null = null;
  let quantity = 1;
  let maxPrice: number | null = null;

  if (match) {
    quantity = match[1] ? parseInt(match[1]) : 1;
    eventName = match[2]?.trim() || null;
    maxPrice = match[3] ? parseFloat(match[3]) : null;
  }

  return {
    intent: 'watch',
    confidence: eventName ? 0.7 : 0.5,
    eventName,
    maxPrice,
    quantity,
    needsClarification: !eventName,
    clarificationMessage: !eventName ? 'What event do you want to watch for?' : null,
  };
}

function parseCancelIntent(message: string): ParsedIntent {
  const match = message.match(/cancel(?:\s+(?:watch|for))?\s+([^.!?\n]+)?/i);
  const eventName = match?.[1]?.trim() || null;

  return {
    intent: 'cancel',
    confidence: 0.8,
    eventName,
    needsClarification: !eventName,
    clarificationMessage: !eventName
      ? "Which watch do you want to cancel? (or 'my watches' to see all)"
      : null,
  };
}
