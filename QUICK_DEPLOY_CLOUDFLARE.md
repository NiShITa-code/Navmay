# 🚀 Quick Deploy to Cloudflare Pages

**Time: 10 minutes** | **Cost: FREE**

---

## Step 1: Push Code to GitHub (if not done)

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## Step 2: Create Cloudflare Account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up (free)
3. Verify email

---

## Step 3: Deploy Your Site

1. **Login to Cloudflare Dashboard**
   - https://dash.cloudflare.com

2. **Go to Pages**
   - Click "Pages" in sidebar

3. **Connect to Git**
   - Click "Create application"
   - Click "Connect to Git"
   - Choose GitHub/GitLab
   - Select your Navamay repository

4. **Configure Build**
   - **Project name:** `navamay`
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

5. **Add Environment Variables:**
   - `VITE_GOOGLE_SCRIPT_URL` = Your Google Script URL
   - `VITE_ENV` = `production`
   - `NODE_VERSION` = `18`

6. **Click "Save and Deploy"**

Wait 2-3 minutes... Done! 🎉

**Your site:** `https://navamay.pages.dev`

---

## Step 4: Connect Your Custom Domain

1. **In Cloudflare Pages:**
   - Click your project
   - Click "Custom domains"
   - Click "Set up a custom domain"

2. **Enter your domain:**
   - Type: `yourdomain.com`
   - Click "Continue"
   - Click "Activate domain"

3. **DNS auto-configured!**
   - Wait 2-5 minutes
   - Your site live at: `https://yourdomain.com`

---

## ✅ Done!

**Benefits:**
- ✅ FREE unlimited bandwidth
- ✅ Global CDN (super fast)
- ✅ Auto SSL certificate
- ✅ Auto-deploy on git push
- ✅ DDoS protection

---

**Full guide:** See `CLOUDFLARE_DEPLOYMENT.md`

**Need help?** Email: info@navamay.com
