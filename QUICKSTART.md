# TicketWatch Quick Start

You have a complete, working TicketWatch backend. Here's how to use it.

## 🚀 Start Here (5 minutes)

### 1. Setup Environment

```bash
cd /home/admin/ticketwatch
source venv/bin/activate  # If you have a venv
```

### 2. Test It Works

```bash
# Test the complete flow
python3 -c "
from handler import handle_message
import json

# Search for events
result = handle_message('me', '+353858536569', 'What concerts are on?')
print(f'✅ Search works: {result[\"intent\"]}')

# Try to create a watch
result = handle_message('me', '+353858536569', 'Watch for 2 Fred Again under €80')
print(f'✅ Watch works: {result[\"intent\"]}')
"
```

## 📱 How It Works

### User sends message:
```
"Watch for 2 Fred Again under €80"
```

### Handler (handler.py):
1. Parses intent → "watch"
2. Searches Ticketmaster → finds Fred Again
3. Shows confirmation
4. Creates watch in SQLite

### Cron job (watcher.py):
- Runs every 5 minutes
- Checks each watch for tickets
- If match found → sends WhatsApp alert

### User gets alert:
```
🚨 TICKETS AVAILABLE!
Fred Again @ 3Arena Dublin
€72 (you wanted under €80)
2x tickets
⚡ Act fast!
[Buy Now]
```

## 🔧 Configuration

Edit `config.py` to change:
- `TM_API_KEY` - Your Ticketmaster key (optional for demo mode)
- `CHECK_INTERVAL_MINUTES` - How often to check (default: 5 min)
- `FREE_TIER_MAX_WATCHES` - Max watches for free users (default: 1)
- `PREMIUM_TIER_PRICE_EUR` - Premium subscription price (default: €4.99)

## 📊 Database Commands

Check what's stored:

```bash
sqlite3 data/ticketwatch.db

# See all tables
.tables

# See watches
SELECT user_id, event_name, max_price, status FROM watches;

# See alerts sent
SELECT event_name, current_price, sent_at FROM alerts_sent;

# Count active watches
SELECT COUNT(*) FROM watches WHERE status='active';
```

## 🎫 Manual Testing

### Test search:
```bash
python3 tm_api.py "Fred Again"
```

### Test parser:
```bash
python3 parser.py
```

### Test database:
```bash
python3 -c "from database import get_db; print(get_db())"
```

### Test watcher:
```bash
python3 watcher.py
```

## 🔌 Integration with OpenClaw

When your OpenClaw receives a WhatsApp message, route it to:

```bash
python3 /home/admin/ticketwatch/handler.py \
  --user-id "$CALLER" \
  --message "$MESSAGE"
```

This will return JSON that OpenClaw sends back as WhatsApp response.

## 🐍 Deploy Cron Job

To automatically check for tickets every 5 minutes:

```bash
crontab -e
```

Add:
```
*/5 * * * * cd /home/admin/ticketwatch && python3 watcher.py >> logs/watcher.log 2>&1
```

Verify it's working:
```bash
# Check recent log
tail -f logs/watcher-$(date +%Y-%m-%d).log
```

## 🎯 Before Going Live

**Checklist:**

- [ ] Get real Ticketmaster API key (https://developer.ticketmaster.com)
- [ ] Set `TICKETMASTER_API_KEY` environment variable
- [ ] Test with real event data
- [ ] Setup cron job on RockPro64
- [ ] Connect to OpenClaw WhatsApp handler
- [ ] Test end-to-end (message → watch → alert)
- [ ] Deploy to GitHub
- [ ] Test with 2-3 friends first

## 🚨 Demo vs. Real Mode

**Demo mode** (no API key):
- Uses fake data (Fred Again, The 1975, Electric Picnic)
- Full functionality works
- Perfect for testing

**Real mode** (with API key):
- Uses actual Ticketmaster API
- Real events, real pricing, real availability
- Real WhatsApp alerts

Switch automatically when you set `TICKETMASTER_API_KEY`.

## 📈 Next Steps

**This week:**
1. Get Ticketmaster API key
2. Test with real data
3. Deploy cron job
4. Connect to OpenClaw

**Next week:**
1. Add Stripe payment integration
2. Build Next.js landing page
3. Deploy to Vercel
4. Beta test with friends

## 💰 Costs

- Ticketmaster API: **Free** (5,000 calls/day)
- Claude Haiku: **~€0.003 per message** (~€5-10/month)
- WhatsApp: **Free** (via OpenClaw)
- RockPro64: **€0** (already own it)

**Total: ~€5-10/month**

---

## ❓ Questions?

Check:
- README.md - Full documentation
- SKILL.md - OpenClaw integration
- config.py - All settings
- database.py - Database schema

Ready? Let's ship it. 🚀
