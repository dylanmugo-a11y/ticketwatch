# TicketWatch

🎫 WhatsApp ticket alert bot for Irish music fans. Never miss sold-out concert tickets again.

**Status**: MVP ready (Demo mode works, waiting for Ticketmaster API key)

## What It Does

Users message on WhatsApp:
- `"Watch for 2 Fred Again under €80"` → Creates a watch
- `"My watches"` → Shows active watches
- `"Any updates?"` → Checks for new tickets
- `"Cancel Fred Again"` → Removes watch

TicketWatch automatically checks Ticketmaster every 5 minutes. When tickets match, sends an instant WhatsApp alert with a buy link.

## Architecture

```
WhatsApp Message
      ↓
   Handler (parse intent)
      ↓
   Ticketmaster API (search/check)
      ↓
   SQLite (store watches)
      ↓
   Cron Job (every 5 min)
      ↓
   Alert → WhatsApp
```

## Quick Start

### 1. Get API Key

Go to https://developer.ticketmaster.com/ and create a free account.
Copy your **Consumer Key** (API key).

### 2. Setup Project

```bash
cd ~/ticketwatch
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Configure

Create a `.env` file (or set environment variable):

```bash
export TICKETMASTER_API_KEY="sk_live_xxxxxxxxxxx"
```

### 4. Test It

```bash
# Test message handling
python3 handler.py

# Test database
sqlite3 data/ticketwatch.db ".tables"

# Test API search
python3 tm_api.py "Fred Again"
```

### 5. Setup Cron Job

```bash
crontab -e
```

Add this line:

```
*/5 * * * * cd /home/admin/ticketwatch && python3 watcher.py >> logs/watcher.log 2>&1
```

### 6. Connect to OpenClaw

Update your OpenClaw workspace to route WhatsApp messages to:

```bash
python3 /home/admin/ticketwatch/handler.py --user-id "$CALLER" --message "$MESSAGE"
```

## File Structure

```
ticketwatch/
├── README.md                 # This file
├── SKILL.md                  # OpenClaw skill definition
├── config.py                 # Configuration
├── database.py               # SQLite schema + helpers
├── tm_api.py                 # Ticketmaster API wrapper
├── parser.py                 # Intent parser (Claude Haiku)
├── handler.py                # Main message handler
├── watcher.py                # Cron job (every 5 min)
├── alerts.py                 # WhatsApp alert sender
├── requirements.txt          # Python dependencies
├── data/                      # Data directory
│   ├── ticketwatch.db       # SQLite database (auto-created)
│   └── alert_queue.jsonl    # Alert queue (for WhatsApp)
└── logs/                      # Log directory
    ├── watcher-2026-02-14.log
    └── watcher-2026-02-15.log
```

## Demo Mode

Until you have a Ticketmaster API key, TicketWatch runs in **DEMO MODE** with fake data:

- Fred Again @ 3Arena Dublin (March 15)
- The 1975 @ O2 Dublin (April 20)  
- Electric Picnic @ Laois (September 5)

All operations work normally (searches, watches, alerts) using mock data.

Once you set `TICKETMASTER_API_KEY`, it automatically switches to real data.

## Usage Examples

### Example 1: Search for Events

```
User: What's on in Dublin?
Bot: 🎵 Found 5 events:
1. Fred Again
   📍 3Arena Dublin
   📅 March 15, 2026
   💰 €65-145
   ✅ On Sale

2. The 1975
   ...
```

### Example 2: Create a Watch

```
User: Watch for 2 Fred Again under €80
Bot: 🎫 Confirm:
   Fred Again @ 3Arena Dublin
   March 15, 2026
   Currently €65-145
   2x tickets, max €80
   
   Reply "yes" to confirm

User: yes
Bot: ✅ Watch created!
     I'll alert you when 2x tickets are available under €80
```

### Example 3: Get Alert

```
[Cron finds tickets at €72]
Bot: 🚨 TICKETS AVAILABLE!
    🎵 Fred Again
    📍 3Arena Dublin
    📅 March 15, 2026
    💰 €72 (you wanted under €80)
    🎟️ 2x tickets
    
    ⚡ Act fast — these won't last!
    [Buy Now](https://www.ticketmaster.ie/...)
```

## Pricing

- **Free Tier**: 1 active watch, unlimited searches
- **Premium**: €4.99/month for unlimited watches
- **Affiliate**: Commission on ticket sales (coming soon)

## Costs

| Component | Cost |
|---|---|
| Ticketmaster API | Free (5,000 calls/day) |
| Claude Haiku | ~€0.003 per message |
| WhatsApp | Via OpenClaw (free) |
| RockPro64 | You already own it |
| **Monthly** | **~€5-10** |

## Team

- **Dylan**: Product, operations
- **Max**: Engineering, TicketWatch AI

## Next Steps (Week 2)

1. ✅ Core backend (DONE)
2. ⬜ Test with real Ticketmaster API key
3. ⬜ Deploy cron job on RockPro64
4. ⬜ Stripe payment integration
5. ⬜ Next.js landing page + Vercel deploy
6. ⬜ Beta testing with friends
7. ⬜ Soft launch on Reddit/socials

## Debugging

### Check logs

```bash
tail -f logs/watcher-$(date +%Y-%m-%d).log
```

### Test parser

```bash
python3 parser.py
```

### Check database

```bash
sqlite3 data/ticketwatch.db "SELECT * FROM watches;"
```

### Manual alert test

```bash
python3 -c "from alerts import send_alert; send_alert('+353858536569', '+353858536569', 'Fred Again', '3Arena Dublin', '2026-03-15', 75.0, 80.0, 2, 'https://...')"
```

## Support

- Questions? Check SKILL.md
- API errors? Check `logs/`
- Database issues? `sqlite3 data/ticketwatch.db`

---

Made with ❤️ for Irish music fans.
Built on RockPro64 + OpenClaw + Ticketmaster API.

**Let's ship it.** 🚀
