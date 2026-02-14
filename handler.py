"""
TicketWatch Message Handler
Receives WhatsApp messages, routes to appropriate handler
"""
import json
import logging
from datetime import datetime
from parser import parse_intent
from database import (
    create_user, get_user_tier, count_active_watches, create_watch,
    get_user_watches, cancel_watch, get_active_watches
)
from tm_api import search_events, get_event, format_event, check_availability
from config import FREE_TIER_MAX_WATCHES

logger = logging.getLogger(__name__)


def handle_message(user_id, phone, message_text):
    """
    Main message handler.
    Receives user message, parses intent, executes action, returns response.
    """
    logger.info(f"Message from {user_id}: {message_text}")

    # Ensure user exists in database
    create_user(user_id, phone)

    # Parse the intent
    intent_result = parse_intent(message_text)
    intent = intent_result.get("intent")

    # Handle each intent type
    if intent == "search":
        return handle_search(user_id, intent_result)
    elif intent == "watch":
        return handle_watch(user_id, intent_result)
    elif intent == "list":
        return handle_list(user_id)
    elif intent == "cancel":
        return handle_cancel(user_id, intent_result)
    elif intent == "status":
        return handle_status(user_id)
    elif intent == "help":
        return handle_help()
    else:
        return {"error": "Unknown intent", "message": "Sorry, I didn't understand that."}


def handle_search(user_id, intent_result):
    """Handle search intent: find events on Ticketmaster."""
    query = intent_result.get("query")
    if not query:
        return {"error": "search", "message": "What events are you looking for?"}

    logger.info(f"Searching for: {query}")
    events = search_events(query, size=5)

    if not events:
        return {
            "intent": "search",
            "found": False,
            "message": f"No events found for '{query}'. Try a different artist or venue name."
        }

    # Format results
    formatted_events = []
    for event in events[:5]:  # Top 5 results
        fmt = format_event(event)
        if fmt:
            formatted_events.append(fmt)

    response_lines = [f"🎵 Found {len(formatted_events)} events:\n"]
    for i, event in enumerate(formatted_events, 1):
        status_emoji = "✅" if event["status"] == "onsale" else "❌"
        price_str = f"€{event['price_min']}-{event['price_max']}" if event['price_min'] else "TBA"
        response_lines.append(
            f"{i}. **{event['name']}**\n"
            f"   📍 {event['venue']}, {event['city']}\n"
            f"   📅 {event['date']} {event['time']}\n"
            f"   💰 {price_str}\n"
            f"   {status_emoji} {event['status']}"
        )

    return {
        "intent": "search",
        "found": True,
        "events": formatted_events,
        "message": "\n".join(response_lines),
        "follow_up": "Want to watch for any of these? Say 'watch for [event] under €[price]'"
    }


def handle_watch(user_id, intent_result):
    """Handle watch intent: create a ticket watch."""
    event_name = intent_result.get("event_name")
    max_price = intent_result.get("max_price")
    quantity = intent_result.get("quantity", 1)

    if intent_result.get("needs_clarification"):
        return {
            "intent": "watch",
            "error": True,
            "message": intent_result.get("clarification_message")
        }

    # Check tier limits
    tier = get_user_tier(user_id)
    active_count = count_active_watches(user_id)

    if tier == "free" and active_count >= FREE_TIER_MAX_WATCHES:
        return {
            "intent": "watch",
            "error": True,
            "message": f"You're on the free tier (max 1 watch). You already have {active_count} active watch. "
                      f"Cancel one or upgrade to Premium (€4.99/mo) for unlimited watches."
        }

    # Search for the event
    logger.info(f"Searching for event: {event_name}")
    events = search_events(event_name, size=3)

    if not events:
        return {
            "intent": "watch",
            "error": True,
            "message": f"Couldn't find '{event_name}'. Check spelling or try searching first."
        }

    # Use first result
    event = events[0]
    event_id = event.get("id")
    fmt = format_event(event)

    # Confirm with user before creating watch
    status_emoji = "✅" if fmt["status"] == "onsale" else "❌"
    price_str = f"€{fmt['price_min']}-{fmt['price_max']}" if fmt['price_min'] else "TBA"
    price_info = f" (currently {price_str})" if fmt['price_min'] else ""
    max_price_info = f" under €{max_price}" if max_price else ""

    response_lines = [
        f"🎫 Confirm your watch:\n",
        f"**{fmt['name']}**{price_info}",
        f"📍 {fmt['venue']} ({fmt['city']})",
        f"📅 {fmt['date']}",
        f"🔔 Alert me for {quantity}x tickets{max_price_info}",
        f"{status_emoji} Current status: {fmt['status']}\n",
        f"Reply with 'yes' to confirm or 'cancel' to skip."
    ]

    return {
        "intent": "watch",
        "action": "confirm",
        "message": "\n".join(response_lines),
        "event_id": event_id,
        "event_name": fmt["name"],
        "venue": fmt["venue"],
        "date": fmt["date"],
        "max_price": max_price,
        "quantity": quantity,
        "buy_url": fmt["url"]
    }


def handle_watch_confirm(user_id, event_id, event_name, venue, date_str, max_price, quantity, buy_url):
    """Confirm and create the watch."""
    watch_id = create_watch(
        user_id=user_id,
        event_id=event_id,
        event_name=event_name,
        venue=venue,
        date_start=date_str,
        max_price=max_price,
        quantity=quantity,
        buy_url=buy_url
    )

    if not watch_id:
        return {
            "error": True,
            "message": f"You're already watching {event_name}. Cancel it first if you want to change the price."
        }

    price_info = f" under €{max_price}" if max_price else ""
    return {
        "success": True,
        "message": f"✅ Watch created for {event_name}!\n"
                   f"I'll alert you on WhatsApp when {quantity}x ticket(s) are available{price_info}.\n\n"
                   f"Reply with 'my watches' to see your active watches.",
        "watch_id": watch_id
    }


def handle_list(user_id):
    """Handle list intent: show user's active watches."""
    watches = get_user_watches(user_id, status="active")

    if not watches:
        return {
            "intent": "list",
            "empty": True,
            "message": "📭 You don't have any active watches.\n"
                      "Start with: 'Watch for [event] under €[price]'"
        }

    response_lines = ["🎫 Your active watches:\n"]
    for w in watches:
        price_info = f" (max €{w['max_price']})" if w['max_price'] else ""
        created = datetime.fromisoformat(w['created_at']).strftime("%d %b")
        response_lines.append(
            f"• {w['event_name']}{price_info}\n"
            f"  {w['quantity']}x tickets • created {created}"
        )

    response_lines.append("\nReply 'cancel [event]' to remove a watch.")
    return {
        "intent": "list",
        "empty": False,
        "watches": watches,
        "message": "\n".join(response_lines)
    }


def handle_cancel(user_id, intent_result):
    """Handle cancel intent: remove a watch."""
    event_name = intent_result.get("event_name")

    if intent_result.get("needs_clarification"):
        return {
            "intent": "cancel",
            "error": True,
            "message": "Which watch do you want to cancel?\n"
                      "Reply with: 'cancel [event name]'"
        }

    watches = get_user_watches(user_id, status="active")
    matching_watches = [w for w in watches if event_name.lower() in w['event_name'].lower()]

    if not matching_watches:
        return {
            "intent": "cancel",
            "error": True,
            "message": f"Didn't find a watch for '{event_name}'.\n"
                      f"Reply 'my watches' to see your active ones."
        }

    # Cancel the first match
    watch = matching_watches[0]
    cancel_watch(watch['id'])

    return {
        "intent": "cancel",
        "success": True,
        "message": f"✅ Cancelled watch for {watch['event_name']}."
    }


def handle_status(user_id):
    """Handle status intent: check for updates on user's watches."""
    watches = get_user_watches(user_id, status="active")

    if not watches:
        return {
            "intent": "status",
            "message": "You don't have any active watches yet."
        }

    response_lines = ["🔍 Checking your watches...\n"]
    updates = []

    for watch in watches:
        availability = check_availability(watch['event_id'], watch['max_price'], watch['quantity'])

        if availability.get("available"):
            updates.append(
                f"🚨 **{watch['event_name']}** - TICKETS AVAILABLE!\n"
                f"   Price: €{availability.get('price')}\n"
                f"   {availability.get('details')}"
            )
        else:
            updates.append(f"❌ {watch['event_name']}: {availability.get('details')}")

    if updates:
        response_lines.extend(updates)
    else:
        response_lines.append("No new tickets available yet. Check back soon!")

    return {
        "intent": "status",
        "message": "\n".join(response_lines)
    }


def handle_help():
    """Handle help intent: show usage."""
    return {
        "intent": "help",
        "message": """🎫 **TicketWatch Help**

I help you find and watch for sold-out concert tickets in Ireland!

**Commands:**
• "Watch for [artist] under €[price]" - Create a ticket watch
• "My watches" - See your active watches
• "Cancel [artist]" - Remove a watch
• "[Artist name]?" - Search for events
• "Any updates?" - Check your watches for new tickets

**Pricing:**
🆓 Free: 1 active watch
💳 Premium (€4.99/mo): Unlimited watches

Say 'watch for Bicep under €75' to start!"""
    }


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    # Test some messages
    test_messages = [
        ("user123", "+353858536569", "Watch for 2 Fred Again under €80"),
        ("user123", "+353858536569", "What concerts are on?"),
        ("user123", "+353858536569", "My watches"),
    ]

    for user_id, phone, msg in test_messages:
        print(f"\n>>> {msg}")
        result = handle_message(user_id, phone, msg)
        print(json.dumps(result, indent=2))
