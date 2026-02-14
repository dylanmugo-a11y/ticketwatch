"""
TicketWatch Configuration
"""
import os
from pathlib import Path

# Directories
PROJECT_ROOT = Path(__file__).parent
DATA_DIR = PROJECT_ROOT / "data"
LOGS_DIR = PROJECT_ROOT / "logs"
DATA_DIR.mkdir(exist_ok=True)
LOGS_DIR.mkdir(exist_ok=True)

# Database
DB_PATH = DATA_DIR / "ticketwatch.db"

# Ticketmaster API
TM_API_KEY = os.getenv("TICKETMASTER_API_KEY", "")  # You'll set this
TM_BASE_URL = "https://app.ticketmaster.com/discovery/v2"
TM_COUNTRY_CODE = "IE"
TM_CHECK_TIMEOUT = 10  # seconds

# OpenClaw (for WhatsApp integration)
OPENCLAW_WORKSPACE = Path.home() / ".openclaw" / "workspace"

# Check intervals
CHECK_INTERVAL_MINUTES = 5  # How often cron runs

# Pricing tiers
FREE_TIER_MAX_WATCHES = 1
PREMIUM_TIER_PRICE_EUR = 4.99  # Monthly subscription

# Alert settings
ALERT_BATCH_SIZE = 5  # Max alerts per batch send
ALERT_COOLDOWN_MINUTES = 60  # Don't spam same user

# Demo/Testing mode
DEMO_MODE = not bool(TM_API_KEY)  # Use mock data if no real API key

# Logging
LOG_LEVEL = "INFO"
LOG_FORMAT = "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
