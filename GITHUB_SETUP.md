# GitHub Setup for TicketWatch

TicketWatch is ready to push to GitHub. Here's how:

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create new repository:
   - **Repository name**: `ticketwatch`
   - **Description**: `🎫 WhatsApp ticket alert bot for Irish music fans`
   - **Visibility**: Public
   - **Add .gitignore**: Already done (Python)
   - **Add license**: MIT (optional)
3. Click "Create repository"

## Step 2: Add GitHub Remote

After creating the repo, GitHub will show you instructions. Run these in your terminal:

```bash
cd /home/admin/ticketwatch

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ticketwatch.git
git branch -M main
git push -u origin main
```

## Step 3: Verify

Go to https://github.com/YOUR_USERNAME/ticketwatch and confirm your code is there.

---

## Alternative: Using SSH (if you have keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/ticketwatch.git
git push -u origin main
```

## Current Git Status

```
Repository: /home/admin/ticketwatch
Commits: 1 (feat: TicketWatch MVP)
Files: 13
Status: Ready to push
```

---

## What to Do Next

After pushing to GitHub:

1. ✅ **Local development**: Continue working on `/home/admin/ticketwatch/`
2. ✅ **Daily commits**: `git push` to backup progress
3. ⏳ **Week 2**: Stripe integration, landing page, Vercel deploy
4. ⏳ **Week 3**: Go live with soft launch

---

Questions? Check the README.md or SKILL.md.
