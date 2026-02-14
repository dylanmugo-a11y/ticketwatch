#!/usr/bin/env python3
"""
TicketWatch Test Suite
"""
import json
import logging
from handler import handle_message
from database import get_user_watches, get_db
from tm_api import search_events, format_event

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_search():
    """Test event search."""
    print("\n=== TEST: Event Search ===")
    result = handle_message("test_user", "+353858536569", "What concerts are on?")
    print(f"Intent: {result['intent']}")
    print(f"Found: {result.get('found', False)}")
    if result.get('found'):
        print(f"Events: {len(result['events'])}")
    assert result['intent'] == 'search'
    print("✅ PASS")

def test_watch_creation():
    """Test watch creation."""
    print("\n=== TEST: Watch Creation ===")
    
    # Test parsing and confirmation
    result1 = handle_message("test_user2", "+353858536569", "Watch for 2 Fred Again under €80")
    print(f"Intent: {result1['intent']}")
    print(f"Action: {result1.get('action')}")
    assert result1['action'] == 'confirm'
    print("✅ Confirmation received")
    
    # Confirm the watch
    result2 = handle_message._handle_watch_confirm(
        user_id="test_user2",
        event_id=result1['event_id'],
        event_name=result1['event_name'],
        venue=result1['venue'],
        date_str=result1['date'],
        max_price=result1['max_price'],
        quantity=result1['quantity'],
        buy_url=result1['buy_url']
    )
    assert result2['success']
    print("✅ Watch created")

def test_list_watches():
    """Test listing watches."""
    print("\n=== TEST: List Watches ===")
    result = handle_message("test_user2", "+353858536569", "My watches")
    print(f"Intent: {result['intent']}")
    print(f"Empty: {result.get('empty')}")
    assert result['intent'] == 'list'
    print("✅ PASS")

def test_cancel_watch():
    """Test watch cancellation."""
    print("\n=== TEST: Cancel Watch ===")
    result = handle_message("test_user2", "+353858536569", "Cancel Fred Again")
    print(f"Intent: {result['intent']}")
    print(f"Success: {result.get('success')}")
    assert result['intent'] == 'cancel'
    print("✅ PASS")

def test_parser():
    """Test intent parser."""
    print("\n=== TEST: Intent Parser ===")
    from parser import parse_intent
    
    tests = [
        ("Watch for 2 Fred Again under €80", "watch"),
        ("My watches", "list"),
        ("Cancel watch", "cancel"),
        ("What's on?", "search"),
        ("Any updates?", "status"),
        ("Help", "help"),
    ]
    
    for msg, expected_intent in tests:
        result = parse_intent(msg)
        actual = result['intent']
        status = "✅" if actual == expected_intent else "❌"
        print(f"{status} '{msg}' → {actual}")
        assert actual == expected_intent
    
    print("✅ All parser tests passed")

def test_api():
    """Test Ticketmaster API."""
    print("\n=== TEST: Ticketmaster API ===")
    events = search_events("Fred Again", size=3)
    print(f"Found {len(events)} events")
    assert len(events) > 0
    
    event = events[0]
    formatted = format_event(event)
    print(f"Event: {formatted['name']}")
    print(f"Venue: {formatted['venue']}")
    print(f"Status: {formatted['status']}")
    assert formatted['name']
    print("✅ PASS")

def test_database():
    """Test database."""
    print("\n=== TEST: Database ===")
    db = get_db()
    
    # Test user creation
    from database import create_user, get_user
    create_user("dbtest", "+353858536569")
    user = get_user("dbtest")
    assert user
    print(f"✅ User created: {user['user_id']}")
    
    # Test watch creation
    from database import create_watch
    watch_id = create_watch(
        "dbtest",
        "Z698xZaZeEe11",
        "Fred Again",
        "3Arena Dublin",
        "2026-03-15",
        80.0,
        2,
        "https://..."
    )
    assert watch_id
    print(f"✅ Watch created: {watch_id}")
    
    # Test list watches
    watches = get_user_watches("dbtest")
    assert len(watches) > 0
    print(f"✅ Listed {len(watches)} watches")

def run_all_tests():
    """Run all tests."""
    print("\n" + "="*50)
    print("🧪 TicketWatch Test Suite")
    print("="*50)
    
    try:
        test_database()
        test_api()
        test_parser()
        test_search()
        test_watch_creation()
        test_list_watches()
        test_cancel_watch()
        
        print("\n" + "="*50)
        print("✅ ALL TESTS PASSED")
        print("="*50 + "\n")
        return True
    except AssertionError as e:
        print(f"\n❌ Test failed: {e}")
        return False
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)
