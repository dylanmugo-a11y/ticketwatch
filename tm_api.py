"""
Ticketmaster API Wrapper with Demo Mode
"""
import json
import logging
import urllib.request
import urllib.error
import urllib.parse
from config import TM_API_KEY, TM_BASE_URL, TM_COUNTRY_CODE, TM_CHECK_TIMEOUT, DEMO_MODE

logger = logging.getLogger(__name__)

# Mock data for testing without API key
MOCK_EVENTS = [
    {
        "id": "Z698xZaZeEe11",
        "name": "Fred Again",
        "dates": {"start": {"localDate": "2026-03-15", "localTime": "20:00"}},
        "_embedded": {
            "venues": [{"name": "3Arena Dublin", "city": {"name": "Dublin"}}]
        },
        "priceRanges": [{"min": 65.0, "max": 145.0}],
        "status": "onsale",
        "url": "https://www.ticketmaster.ie/fred-again-dublin-03-15-2026/event/12345"
    },
    {
        "id": "Z123xZaZeEe22",
        "name": "The 1975",
        "dates": {"start": {"localDate": "2026-04-20", "localTime": "19:30"}},
        "_embedded": {
            "venues": [{"name": "O2 Dublin", "city": {"name": "Dublin"}}]
        },
        "priceRanges": [{"min": 75.0, "max": 125.0}],
        "status": "offsale",
        "url": "https://www.ticketmaster.ie/the-1975-dublin-04-20-2026/event/67890"
    },
    {
        "id": "Z456xZaZeEe33",
        "name": "Electric Picnic",
        "dates": {"start": {"localDate": "2026-09-05", "localTime": "11:00"}},
        "_embedded": {
            "venues": [{"name": "Laois Picnic", "city": {"name": "Laois"}}]
        },
        "priceRanges": [{"min": 125.0, "max": 185.0}],
        "status": "offsale",
        "url": "https://www.ticketmaster.ie/electric-picnic-laois-09-05-2026/event/11111"
    },
]


def search_events(query, city=None, size=10):
    """
    Search Ticketmaster for Irish events.
    Returns list of event dicts.
    """
    if DEMO_MODE:
        logger.info(f"DEMO MODE: Searching for '{query}'")
        # Filter mock data by keyword
        query_lower = query.lower()
        results = [e for e in MOCK_EVENTS if query_lower in e["name"].lower()]
        if not results:
            results = MOCK_EVENTS[:3]  # Return some defaults
        return results

    params = urllib.parse.urlencode({
        "apikey": TM_API_KEY,
        "keyword": query,
        "countryCode": TM_COUNTRY_CODE,
        "size": size,
        "sort": "date,asc"
    })
    url = f"{TM_BASE_URL}/events.json?{params}"

    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=TM_CHECK_TIMEOUT) as resp:
            data = json.loads(resp.read().decode())
        events = data.get("_embedded", {}).get("events", [])
        logger.info(f"Found {len(events)} events for '{query}'")
        return events
    except urllib.error.HTTPError as e:
        logger.error(f"API Error: {e.code} {e.reason}")
        return []
    except Exception as e:
        logger.error(f"API Error: {e}")
        return []


def get_event(event_id):
    """
    Get detailed info about a specific event.
    """
    if DEMO_MODE:
        logger.info(f"DEMO MODE: Getting event {event_id}")
        for e in MOCK_EVENTS:
            if e["id"] == event_id:
                return e
        return None

    params = urllib.parse.urlencode({"apikey": TM_API_KEY})
    url = f"{TM_BASE_URL}/events/{event_id}.json?{params}"

    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=TM_CHECK_TIMEOUT) as resp:
            event = json.loads(resp.read().decode())
        logger.info(f"Retrieved event {event_id}")
        return event
    except urllib.error.HTTPError as e:
        logger.error(f"API Error for {event_id}: {e.code}")
        return None
    except Exception as e:
        logger.error(f"API Error: {e}")
        return None


def format_event(event):
    """
    Convert raw event data to friendly format.
    """
    if not event:
        return None

    venue_name = "TBA"
    city_name = ""
    if "_embedded" in event and "venues" in event["_embedded"]:
        venues = event["_embedded"]["venues"]
        if venues:
            venue_name = venues[0].get("name", "TBA")
            city_name = venues[0].get("city", {}).get("name", "")

    dates = event.get("dates", {}).get("start", {})
    date_str = dates.get("localDate", "TBA")
    time_str = dates.get("localTime", "")

    price_min = None
    price_max = None
    if "priceRanges" in event and event["priceRanges"]:
        price_min = event["priceRanges"][0].get("min")
        price_max = event["priceRanges"][0].get("max")

    status = event.get("dates", {}).get("status", {}).get("code", "unknown")

    return {
        "id": event.get("id"),
        "name": event.get("name"),
        "venue": venue_name,
        "city": city_name,
        "date": date_str,
        "time": time_str,
        "price_min": price_min,
        "price_max": price_max,
        "status": status,
        "url": event.get("url", "")
    }


def check_availability(event_id, max_price=None, quantity=1):
    """
    Check if event has available tickets at target price.
    Returns: {"available": bool, "price": float, "status": str, "details": str}
    """
    event = get_event(event_id)
    if not event:
        return {"available": False, "status": "not_found", "details": "Event not found"}

    event_status = event.get("dates", {}).get("status", {}).get("code", "unknown")
    
    if event_status != "onsale":
        return {
            "available": False,
            "status": event_status,
            "details": f"Event status: {event_status}"
        }

    price_ranges = event.get("priceRanges", [])
    if not price_ranges:
        return {
            "available": False,
            "status": "no_pricing",
            "details": "No pricing information available"
        }

    min_price = price_ranges[0].get("min")
    max_available = price_ranges[0].get("max")

    if max_price and min_price:
        if min_price <= max_price:
            return {
                "available": True,
                "status": "onsale",
                "price": min_price,
                "price_max": max_available,
                "details": f"Tickets available from €{min_price}"
            }
        else:
            return {
                "available": False,
                "status": "above_target",
                "price": min_price,
                "details": f"Cheapest ticket €{min_price} (your target: €{max_price})"
            }

    return {
        "available": True,
        "status": "onsale",
        "price": min_price,
        "price_max": max_available,
        "details": f"Tickets available from €{min_price}"
    }


if __name__ == "__main__":
    # Quick test
    import sys
    logging.basicConfig(level=logging.INFO)

    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        results = search_events(query)
        for event in results:
            formatted = format_event(event)
            print(json.dumps(formatted, indent=2))
    else:
        print("Usage: python tm_api.py <search_query>")
