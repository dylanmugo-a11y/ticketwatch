"""
TicketWatch Checker
Cron job that runs every 5 minutes to check all active watches
"""
import json
import logging
from datetime import datetime
from database import get_active_watches, update_watch_status, record_alert, get_user
from tm_api import check_availability
from alerts import send_alert

logger = logging.getLogger(__name__)


def check_all_watches():
    """
    Check all active watches against Ticketmaster API.
    Send alerts when tickets match criteria.
    """
    logger.info("=== Starting watch check ===")

    watches = get_active_watches()
    logger.info(f"Checking {len(watches)} active watches")

    alerts_sent = 0
    errors = 0

    for watch in watches:
        try:
            check_single_watch(watch)
            alerts_sent += 1
        except Exception as e:
            logger.error(f"Error checking watch {watch['id']}: {e}")
            errors += 1

    logger.info(f"=== Check complete: {alerts_sent} checked, {errors} errors ===")
    return {"checked": len(watches), "alerts": alerts_sent, "errors": errors}


def check_single_watch(watch):
    """Check a single watch for ticket availability."""
    watch_id = watch["id"]
    user_id = watch["user_id"]
    event_id = watch["event_id"]
    event_name = watch["event_name"]
    max_price = watch.get("max_price")
    quantity = watch.get("quantity", 1)

    logger.debug(f"Checking watch {watch_id}: {event_name}")

    # Check availability on Ticketmaster
    result = check_availability(event_id, max_price, quantity)

    # Update last_checked timestamp
    update_watch_status(watch_id, "active", last_checked=datetime.now().isoformat())

    # If tickets are available at target price, send alert
    if result.get("available"):
        logger.info(f"🚨 MATCH! Watch {watch_id}: {event_name} has tickets available")

        # Get user contact info
        user = get_user(user_id)
        if not user:
            logger.error(f"User {user_id} not found")
            return

        # Send alert
        alert_result = send_alert(
            user_id=user_id,
            phone=user.get("phone"),
            event_name=event_name,
            venue=watch.get("venue"),
            date=watch.get("date_start"),
            current_price=result.get("price"),
            max_price=max_price,
            quantity=quantity,
            buy_url=watch.get("buy_url")
        )

        if alert_result.get("success"):
            # Record the alert
            record_alert(watch_id, user_id, event_name, result.get("price"))
            logger.info(f"Alert sent for watch {watch_id}")
        else:
            logger.error(f"Failed to send alert for watch {watch_id}")
    else:
        logger.debug(f"No match for watch {watch_id}: {result.get('details')}")


def main():
    """Entry point for cron job."""
    import sys
    from config import CHECK_INTERVAL_MINUTES, LOG_LEVEL, LOG_FORMAT
    from pathlib import Path

    # Setup logging
    log_file = Path.home() / "ticketwatch" / "logs" / f"watcher-{datetime.now().strftime('%Y-%m-%d')}.log"
    log_file.parent.mkdir(parents=True, exist_ok=True)

    logging.basicConfig(
        level=LOG_LEVEL,
        format=LOG_FORMAT,
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler(sys.stdout)
        ]
    )

    logger.info(f"Check interval: {CHECK_INTERVAL_MINUTES} minutes")

    # Run the check
    result = check_all_watches()

    # Output JSON for cron logging
    print(json.dumps({
        "timestamp": datetime.now().isoformat(),
        "status": "success",
        "result": result
    }))


if __name__ == "__main__":
    main()
