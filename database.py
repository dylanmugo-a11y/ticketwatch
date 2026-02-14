"""
TicketWatch Database Schema and Helpers
"""
import sqlite3
import logging
from datetime import datetime
from config import DB_PATH

logger = logging.getLogger(__name__)


def get_db():
    """Get database connection."""
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    _init_schema(conn)
    return conn


def _init_schema(conn):
    """Initialize database tables if they don't exist."""
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        phone TEXT,
        tier TEXT DEFAULT 'free',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_activity TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS watches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        event_id TEXT NOT NULL,
        event_name TEXT NOT NULL,
        venue TEXT,
        date_start TEXT,
        max_price REAL,
        quantity INTEGER DEFAULT 1,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_checked TIMESTAMP,
        alerted_at TIMESTAMP,
        buy_url TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id),
        UNIQUE(user_id, event_id)
    );

    CREATE TABLE IF NOT EXISTS alerts_sent (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        watch_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        event_name TEXT,
        current_price REAL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(watch_id) REFERENCES watches(id),
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    );

    CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        tier TEXT DEFAULT 'free',
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    );

    CREATE INDEX IF NOT EXISTS idx_watches_user_status ON watches(user_id, status);
    CREATE INDEX IF NOT EXISTS idx_watches_status ON watches(status);
    CREATE INDEX IF NOT EXISTS idx_alerts_watch ON alerts_sent(watch_id);
    """)
    conn.commit()


def create_user(user_id, phone=None):
    """Create or update a user."""
    db = get_db()
    db.execute(
        "INSERT OR REPLACE INTO users (user_id, phone, last_activity) VALUES (?, ?, ?)",
        (user_id, phone, datetime.now().isoformat())
    )
    db.commit()
    logger.info(f"User {user_id} created/updated")


def get_user(user_id):
    """Get user info."""
    db = get_db()
    row = db.execute("SELECT * FROM users WHERE user_id=?", (user_id,)).fetchone()
    return dict(row) if row else None


def get_user_tier(user_id):
    """Get user tier (free/premium)."""
    user = get_user(user_id)
    return user["tier"] if user else "free"


def create_watch(user_id, event_id, event_name, venue, date_start, max_price, quantity, buy_url):
    """Create a new watch."""
    db = get_db()
    try:
        db.execute(
            """INSERT INTO watches 
               (user_id, event_id, event_name, venue, date_start, max_price, quantity, buy_url)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (user_id, event_id, event_name, venue, date_start, max_price, quantity, buy_url)
        )
        db.commit()
        watch_id = db.lastrowid
        logger.info(f"Watch {watch_id} created for {user_id}: {event_name}")
        return watch_id
    except sqlite3.IntegrityError:
        logger.warning(f"Watch already exists for {user_id}: {event_id}")
        return None


def get_user_watches(user_id, status="active"):
    """Get all watches for a user."""
    db = get_db()
    rows = db.execute(
        "SELECT * FROM watches WHERE user_id=? AND status=? ORDER BY created_at DESC",
        (user_id, status)
    ).fetchall()
    return [dict(row) for row in rows]


def get_active_watches():
    """Get all active watches (for cron checker)."""
    db = get_db()
    rows = db.execute(
        "SELECT * FROM watches WHERE status='active' ORDER BY last_checked ASC"
    ).fetchall()
    return [dict(row) for row in rows]


def update_watch_status(watch_id, status, last_checked=None):
    """Update watch status (active/alerted/cancelled)."""
    db = get_db()
    now = datetime.now().isoformat() if last_checked is None else last_checked
    db.execute(
        "UPDATE watches SET status=?, last_checked=? WHERE id=?",
        (status, now, watch_id)
    )
    db.commit()


def cancel_watch(watch_id):
    """Cancel a watch."""
    db = get_db()
    db.execute("UPDATE watches SET status='cancelled' WHERE id=?", (watch_id,))
    db.commit()
    logger.info(f"Watch {watch_id} cancelled")


def record_alert(watch_id, user_id, event_name, current_price):
    """Record that an alert was sent for this watch."""
    db = get_db()
    db.execute(
        "INSERT INTO alerts_sent (watch_id, user_id, event_name, current_price) VALUES (?,?,?,?)",
        (watch_id, user_id, event_name, current_price)
    )
    db.commit()
    # Update watch to 'alerted' status
    db.execute(
        "UPDATE watches SET status='alerted', alerted_at=? WHERE id=?",
        (datetime.now().isoformat(), watch_id)
    )
    db.commit()
    logger.info(f"Alert recorded for watch {watch_id}")


def count_active_watches(user_id):
    """Count active watches for a user."""
    db = get_db()
    result = db.execute(
        "SELECT COUNT(*) as cnt FROM watches WHERE user_id=? AND status='active'",
        (user_id,)
    ).fetchone()
    return result["cnt"] if result else 0


def get_recent_alerts(limit=10):
    """Get recent alerts sent."""
    db = get_db()
    rows = db.execute(
        "SELECT * FROM alerts_sent ORDER BY sent_at DESC LIMIT ?",
        (limit,)
    ).fetchall()
    return [dict(row) for row in rows]
