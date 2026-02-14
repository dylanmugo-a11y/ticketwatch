"""
TicketWatch Alert Sender
Sends WhatsApp alerts when tickets are found
"""
import json
import logging
from pathlib import Path
from config import OPENCLAW_WORKSPACE

logger = logging.getLogger(__name__)


def send_alert(user_id, phone, event_name, venue, date, current_price, max_price, quantity, buy_url):
    """
    Send a WhatsApp alert via OpenClaw when tickets are found.
    
    Returns: {"success": bool, "message": str}
    """
    logger.info(f"Sending alert to {user_id}: {event_name}")

    # Format the alert message
    message = format_alert_message(
        event_name, venue, date, current_price, max_price, quantity, buy_url
    )

    # Try to send via OpenClaw
    result = send_whatsapp_via_openclaw(user_id, message)

    if result["success"]:
        logger.info(f"Alert sent to {user_id}")
        return {"success": True, "message": "Alert sent"}
    else:
        logger.error(f"Failed to send alert to {user_id}: {result.get('error')}")
        return {"success": False, "error": result.get("error")}


def format_alert_message(event_name, venue, date, current_price, max_price, quantity, buy_url):
    """Format a nice alert message for WhatsApp."""
    lines = [
        "🚨 **TICKETS AVAILABLE!**\n",
        f"🎵 {event_name}",
        f"📍 {venue}",
        f"📅 {date}",
        f"💰 €{current_price} (you wanted under €{max_price})" if max_price else f"💰 €{current_price}",
        f"🎟️  {quantity}x tickets\n",
        "⚡ **Act fast — these won't last!**\n"
    ]

    if buy_url:
        lines.append(f"[Buy Now]({buy_url})")
    
    return "\n".join(lines)


def send_whatsapp_via_openclaw(user_id, message):
    """
    Send a WhatsApp message via OpenClaw.
    
    This integrates with your existing OpenClaw setup.
    In production, this could use:
    1. OpenClaw's API
    2. Direct WhatsApp Business API
    3. A webhook/callback
    
    For MVP, we'll log it and assume you can receive via WhatsApp directly.
    """
    try:
        # Check if we can use OpenClaw's message sending
        # For now, just log and return success
        # In production, implement actual WhatsApp sending here
        
        logger.info(f"WhatsApp to {user_id}:\n{message}")

        # Option 1: Write to a queue file that OpenClaw polls
        queue_file = Path.home() / "ticketwatch" / "data" / "alert_queue.jsonl"
        queue_file.parent.mkdir(parents=True, exist_ok=True)

        with open(queue_file, "a") as f:
            f.write(json.dumps({
                "timestamp": __import__("datetime").datetime.now().isoformat(),
                "user_id": user_id,
                "message": message
            }) + "\n")

        return {"success": True}

    except Exception as e:
        logger.error(f"Error sending WhatsApp: {e}")
        return {"success": False, "error": str(e)}


def send_via_openclaw_agent(user_id, message):
    """
    Send message using OpenClaw's agent API.
    (For future integration)
    """
    # This would use OpenClaw's sessions_send to deliver to a specific user
    # Example:
    # sessions_send(message=f"To {user_id}: {message}", label="ticketwatch")
    pass


def send_via_whatsapp_business_api(phone, message):
    """
    Send via official WhatsApp Business API.
    (For scaling beyond free tier)
    """
    # This would require WhatsApp Business Account setup
    # Would call official API instead of OpenClaw
    pass


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    # Test alert formatting
    test_alert = format_alert_message(
        event_name="Fred Again",
        venue="3Arena Dublin",
        date="2026-03-15",
        current_price=75.0,
        max_price=80.0,
        quantity=2,
        buy_url="https://www.ticketmaster.ie/fred-again-dublin"
    )

    print("Sample alert:")
    print(test_alert)

    # Test sending (won't actually send, just logs)
    # result = send_alert(
    #     user_id="+353858536569",
    #     phone="+353858536569",
    #     event_name="Fred Again",
    #     venue="3Arena Dublin",
    #     date="2026-03-15",
    #     current_price=75.0,
    #     max_price=80.0,
    #     quantity=2,
    #     buy_url="https://www.ticketmaster.ie/fred-again-dublin"
    # )
    # print(f"Result: {result}")
