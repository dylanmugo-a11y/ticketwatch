# TicketWatch Deploy - Quick Start

Copy/paste commands below. Takes ~1 hour total.

---

## 1️⃣ GitHub Setup (5 min)

```bash
# In terminal on your machine

cd /home/admin/ticketwatch

# Create GitHub repo first at github.com/new
# Then run:

git remote add origin https://github.com/YOUR_USERNAME/ticketwatch.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ Vercel Deploy (15 min)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Select your `ticketwatch` repo
5. Click "Deploy"
6. Wait ~2 minutes
7. **LIVE at** `https://ticketwatch.vercel.app`

---

## 3️⃣ Add Domain (10 min)

1. Buy `ticketwatch.ie` at namecheap.com (~€8/year)
2. In Vercel: Settings → Domains
3. Add `ticketwatch.ie`
4. Follow DNS setup (Vercel shows exact steps)
5. Wait 5-10 minutes for propagation

---

## 4️⃣ Stripe Setup (10 min)

1. Go to https://stripe.com
2. Create account
3. Go to API Keys
4. Copy **Publishable Key** (pk_live_...)
5. Copy **Secret Key** (sk_live_...)
6. In Vercel: Settings → Environment Variables
7. Add:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_xxx
   STRIPE_SECRET_KEY = sk_live_xxx
   ```
8. Redeploy (Vercel auto-rebuilds)

---

## 5️⃣ Test & Go Live (10 min)

✅ Visit https://ticketwatch.ie (or your domain)  
✅ Check hero section loads  
✅ Check pricing section  
✅ Click WhatsApp button  
✅ Test mobile responsive  

Post first social media post:
- Copy Day 1 caption from `social_media_content.md`
- Post on Instagram, TikTok, Twitter
- Link to ticketwatch.ie

---

## 🎉 You're Live!

Backend is already running 24/7 on RockPro64:
- WhatsApp messages → OpenClaw handler
- Cron job checking every 5 min
- Alerts going out automatically

**Total time:** ~1 hour  
**Total cost:** €8 (domain) + Stripe fees (only on payments)

---

## If Something Goes Wrong

| Issue | Fix |
|-------|-----|
| GitHub push fails | Check SSH keys: `ssh -T git@github.com` |
| Vercel build fails | Check Node version: `node --version` (needs 18+) |
| Domain not working | DNS takes 5-10 min. Check in Vercel dashboard. |
| Stripe not connecting | Verify env vars are set in Vercel. Redeploy. |

---

**Questions?** Message +353858536569 on WhatsApp.

You've got this! 🚀
