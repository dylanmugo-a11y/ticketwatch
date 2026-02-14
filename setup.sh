#!/bin/bash
# TicketWatch Setup Script

set -e

echo "🎫 TicketWatch Setup"
echo "===================="

# Check Python version
python3 --version

# Create directories
mkdir -p data logs

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
echo "📦 Installing dependencies..."
pip install -q -r requirements.txt

# Initialize database
echo "🗄️  Initializing database..."
python3 -c "from database import get_db; db = get_db(); print('✅ Database ready')"

# Create demo data
echo "📝 Creating demo data..."
python3 -c "
from database import create_user, create_watch
from datetime import datetime
create_user('demo_user', '+353858536569')
watch_id = create_watch(
    'demo_user',
    'Z698xZaZeEe11',
    'Fred Again',
    '3Arena Dublin',
    '2026-03-15',
    80.0,
    2,
    'https://www.ticketmaster.ie/fred-again-dublin'
)
print(f'✅ Demo watch created (ID: {watch_id})')
"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Set API key: export TICKETMASTER_API_KEY='your_key'"
echo "2. Test handler: python3 handler.py"
echo "3. Setup cron: crontab -e (add: */5 * * * * cd $PWD && python3 watcher.py)"
echo ""
echo "🚀 Ready to ship!"
