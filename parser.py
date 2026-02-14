"""
Claude Haiku Intent Parser
Parses natural language WhatsApp messages into structured watch intents
"""
import json
import logging
import re

logger = logging.getLogger(__name__)

# System prompt for Claude to parse ticket watch intents
SYSTEM_PROMPT = """You are a ticket watch intent parser for TicketWatch, an Irish ticket alert service.

Your job is to parse WhatsApp messages from users and extract their intent into structured JSON.

## Intent Types

1. **search**: User wants to search for events
   - extract: query (string), location (optional)
   - example: "What gigs are on in Dublin?"

2. **watch**: User wants to create a watch for available tickets
   - extract: event_name, max_price (optional), quantity (default 1)
   - example: "Watch for 2 Fred Again tickets under €80"

3. **list**: User wants to see their active watches
   - extract: none
   - examples: "my watches", "what am I watching?", "list watches"

4. **cancel**: User wants to cancel a watch
   - extract: event_name (optional - if not given, ask which one)
   - examples: "cancel watch", "stop watching Fred Again"

5. **status**: User wants to check for new ticket alerts
   - extract: none
   - examples: "any updates?", "check my watches", "news?"

6. **help**: User needs help
   - extract: none
   - examples: "help", "how does this work?", "?"

## Parsing Rules

- Event names: proper nouns (artists, festivals, etc.)
- Prices: any number followed by "€", "euro", or "pounds" = max_price
- Quantities: number before "ticket/tickets/x" = quantity
- If user says "Fred Again" they mean the artist, not literal event ID
- Currency defaults to EUR (€) for Irish context
- Ignore common words: "watch for", "alert me", "let me know"

## Response Format

Always respond with ONLY valid JSON (no markdown, no explanation):
{
  "intent": "<intent_type>",
  "confidence": <0.0-1.0>,
  "event_name": "<if applicable>",
  "max_price": <float or null>,
  "quantity": <int or null>,
  "query": "<for search intents>",
  "location": "<optional>",
  "needs_clarification": <bool>,
  "clarification_message": "<if needs_clarification>"
}

If you're unsure, set needs_clarification to true with a helpful message."""


def parse_intent(user_message):
    """
    Parse a user message using Claude Haiku (via OpenClaw).
    Falls back to regex parsing if Claude is unavailable.
    
    Returns dict with parsed intent or error.
    """
    logger.info(f"Parsing: {user_message}")

    # Try to use Claude via OpenClaw
    try:
        from pathlib import Path
        import json as json_lib
        
        # Check if we can call OpenClaw (requires it to be configured)
        openclaw_result = _call_openclaw_parser(user_message)
        if openclaw_result:
            logger.info(f"Claude parsed: {openclaw_result['intent']}")
            return openclaw_result
    except Exception as e:
        logger.warning(f"Claude unavailable: {e}, falling back to regex")

    # Fallback to rule-based parsing
    return _regex_parse_intent(user_message)


def _call_openclaw_parser(message):
    """Call the actual OpenClaw agent to parse using Claude."""
    try:
        # This would use sessions_send to talk to OpenClaw
        # For now, we'll use direct regex fallback
        # In production, this would go through OpenClaw's agent API
        return None
    except Exception as e:
        logger.error(f"OpenClaw call failed: {e}")
        return None


def _regex_parse_intent(message):
    """
    Fallback rule-based intent parser.
    Good enough for MVP, uses regex and heuristics.
    """
    msg_lower = message.lower().strip()
    
    # Intents
    if any(w in msg_lower for w in ["watch", "alert", "notify", "tell me when", "let me know when"]):
        return _parse_watch_intent(message)
    elif any(w in msg_lower for w in ["cancel", "stop", "remove", "unwatch"]):
        return _parse_cancel_intent(message)
    elif any(w in msg_lower for w in ["my watches", "list", "what am i", "check my", "active"]):
        return _parse_list_intent(message)
    elif any(w in msg_lower for w in ["update", "check", "any", "news", "status", "tickets available"]):
        return _parse_status_intent(message)
    elif any(w in msg_lower for w in ["gig", "concert", "event", "on", "playing", "what's", "show", "tour"]):
        return _parse_search_intent(message)
    elif any(w in msg_lower for w in ["help", "how", "?"]):
        return _parse_help_intent(message)
    else:
        return {
            "intent": "search",
            "confidence": 0.5,
            "query": message,
            "needs_clarification": True,
            "clarification_message": f"Not sure what you need. Did you want to search for events, create a watch, or something else?"
        }


def _parse_watch_intent(message):
    """Parse watch/alert intent."""
    # Extract event name
    event_match = re.search(
        r"(?:watch|alert|notify)(?:\s+(?:for|me|when))?\s+(?:(\d+)\s+)?(?:tickets?\s+)?(?:for\s+)?(?:to\s+)?([^€\n]+?)(?:\s+(?:under|below|max|less than|\<)?\s*€?(\d+))?",
        message, re.IGNORECASE
    )
    
    event_name = None
    quantity = 1
    max_price = None
    
    if event_match:
        quantity_str, event_str, price_str = event_match.groups()
        event_name = event_str.strip() if event_str else None
        quantity = int(quantity_str) if quantity_str else 1
        max_price = float(price_str) if price_str else None

    return {
        "intent": "watch",
        "confidence": 0.7 if event_name else 0.5,
        "event_name": event_name,
        "max_price": max_price,
        "quantity": quantity,
        "needs_clarification": not event_name,
        "clarification_message": "What event do you want to watch for?" if not event_name else None
    }


def _parse_cancel_intent(message):
    """Parse cancel intent."""
    # Try to extract event name after "cancel"
    event_match = re.search(r"cancel(?:\s+(?:watch|for))?\s+([^.!?\n]+)?", message, re.IGNORECASE)
    event_name = event_match.group(1).strip() if event_match and event_match.group(1) else None

    return {
        "intent": "cancel",
        "confidence": 0.8,
        "event_name": event_name,
        "needs_clarification": not event_name,
        "clarification_message": "Which watch do you want to cancel? (or 'my watches' to see all)" if not event_name else None
    }


def _parse_list_intent(message):
    """Parse list intent."""
    return {
        "intent": "list",
        "confidence": 0.9,
        "needs_clarification": False
    }


def _parse_status_intent(message):
    """Parse status/check intent."""
    return {
        "intent": "status",
        "confidence": 0.8,
        "needs_clarification": False
    }


def _parse_search_intent(message):
    """Parse search intent."""
    return {
        "intent": "search",
        "confidence": 0.7,
        "query": message,
        "needs_clarification": False
    }


def _parse_help_intent(message):
    """Parse help intent."""
    return {
        "intent": "help",
        "confidence": 0.9,
        "needs_clarification": False
    }


if __name__ == "__main__":
    # Test the parser
    import sys
    logging.basicConfig(level=logging.INFO)

    test_messages = [
        "Watch for 2 Fred Again tickets under €80",
        "What concerts are on in Dublin?",
        "My watches",
        "Cancel Fred Again",
        "Any updates?",
        "Help",
    ]

    for msg in test_messages:
        result = parse_intent(msg)
        print(f"\nMessage: {msg}")
        print(f"Intent: {result['intent']} (confidence: {result['confidence']})")
        if result.get('needs_clarification'):
            print(f"⚠️  Needs clarification: {result['clarification_message']}")
