# 🌐 Deploy Navamay Website to Cloudflare Pages

Complete guide to deploy your React website to Cloudflare Pages with your custom domain.

**Time:** 15 minutes | **Cost:** FREE

---

## 🎯 Why Cloudflare Pages?

✅ **FREE unlimited bandwidth**
✅ **Global CDN (super fast worldwide)**
✅ **Free SSL certificates**
✅ **Easy custom domain setup**
✅ **Automatic deployments from Git**
✅ **Unlimited sites on free plan**

---

## 📋 Prerequisites

- Cloudflare account (free)
- Your GitHub/GitLab repository with code
- Domain registered with Cloudflare (or transfer it)

---

## 🚀 Method 1: Deploy via Cloudflare Dashboard (Easiest)

### Step 1: Push Your Code to GitHub (if not already)

```bash
# If you haven't pushed to GitHub yet
git add .
git commit -m "Ready for Cloudflare deployment"
git push origin main
```

### Step 2: Create Cloudflare Account

1. Go to [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Sign up for free account
3. Verify your email

### Step 3: Create Pages Project

1. **Login to Cloudflare Dashboard**
   - Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)

2. **Navigate to Pages**
   - Click **"Pages"** in the left sidebar
   - Or go to: Workers & Pages → Pages tab

3. **Create Application**
   - Click **"Create application"**
   - Click **"Connect to Git"**

4. **Connect Your Repository**
   - Choose **GitHub** or **GitLab**
   - Click **"Connect GitHub"** (or GitLab)
   - Authorize Cloudflare to access your repositories
   - Select **"Only select repositories"**
   - Choose your **Navamay repository**
   - Click **"Install & Authorize"**

5. **Select Repository**
   - You'll see your repository listed
   - Click **"Begin setup"**

### Step 4: Configure Build Settings

**Project Settings:**
- **Project name:** `navamay` (or your choice - this will be your subdomain)
- **Production branch:** `main` (or your main branch name)

**Build Settings:**
- **Framework preset:** Select **"Vite"**
- **Build command:** `npm run build`
- **Build output directory:** `dist`

**Environment Variables** (IMPORTANT!):
Click **"Add variable"** and add:

| Variable Name | Value |
|---------------|-------|
| `VITE_GOOGLE_SCRIPT_URL` | `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec` |
| `VITE_ENV` | `production` |
| `NODE_VERSION` | `18` |

**Root directory:** Leave empty (unless your app is in a subdirectory)

### Step 5: Deploy!

1. Click **"Save and Deploy"**
2. Cloudflare will:
   - Clone your repository
   - Install dependencies
   - Build your project
   - Deploy to global CDN
3. **Wait 2-5 minutes** for first build

### Step 6: View Your Site

Once deployed, you'll see:
- ✅ **Your site URL:** `https://navamay.pages.dev`
- Or whatever name you chose: `https://your-project-name.pages.dev`

**Test it!** Click the URL to open your website.

---

## 🌍 Method 2: Deploy via CLI (Advanced)

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This opens a browser for authentication.

### Step 3: Build Your Project

```bash
npm run build
```

### Step 4: Deploy

```bash
wrangler pages deploy dist --project-name=navamay
```

First time, it will create the project. Subsequent deployments update it.

---

## 🔗 Connect Your Custom Domain

You have a domain registered with Cloudflare. Let's connect it!

### Step 1: Add Domain to Your Pages Project

1. **Go to Pages Dashboard**
   - [https://dash.cloudflare.com](https://dash.cloudflare.com) → Pages
   - Click on your **"navamay"** project

2. **Navigate to Custom Domains**
   - Click **"Custom domains"** tab

3. **Add Custom Domain**
   - Click **"Set up a custom domain"**
   - Enter your domain: `yourdomain.com`
   - Click **"Continue"**

4. **Choose DNS Records**
   - Cloudflare will suggest DNS records
   - Click **"Activate domain"**

### Step 2: DNS Configuration

Cloudflare automatically creates:

**For root domain (example.com):**
```
Type: CNAME
Name: @
Target: navamay.pages.dev
Proxy: Enabled (orange cloud)
```

**For www subdomain (www.example.com):**
```
Type: CNAME
Name: www
Target: navamay.pages.dev
Proxy: Enabled (orange cloud)
```

**That's it!** DNS is auto-configured.

### Step 3: Wait for Propagation

- **SSL Certificate:** Auto-generated (1-2 minutes)
- **DNS Propagation:** 1-5 minutes
- **Your site will be live at:** `https://yourdomain.com`

### Step 4: Add www Redirect (Optional)

To redirect www to non-www (or vice versa):

1. **Go to Pages Project Settings**
2. **Custom domains** tab
3. Both `example.com` and `www.example.com` should be listed
4. Cloudflare automatically handles redirects!

---

## 🔄 Automatic Deployments

Every time you push to GitHub, Cloudflare automatically:
1. Detects the new commit
2. Builds your project
3. Deploys new version
4. Updates your website

**No manual deployment needed!**

### View Deployment Status

- Go to Pages Dashboard → Your Project
- Click **"Deployments"** tab
- See all deployments, logs, and status

---

## ⚙️ Environment Variables

### Add More Environment Variables

1. **Go to Project Settings**
   - Pages Dashboard → Your Project
   - Click **"Settings"** tab

2. **Environment Variables Section**
   - Click **"Add variable"**
   - Add your variables:

**For Google Analytics:**
```
VITE_GA_TRACKING_ID = G-XXXXXXXXXX
```

**For SendGrid:**
```
SENDGRID_API_KEY = SG.xxxxxxxxxxxxx
ADMIN_EMAIL = your-email@example.com
```

3. **Redeploy**
   - Go to **Deployments** tab
   - Click on latest deployment
   - Click **"Retry deployment"**

---

## 🎨 Custom Configuration

### Configure Build Settings

**package.json** should have:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Configure Redirects (for SPA)

Create `public/_redirects` file:
```
/* /index.html 200
```

This ensures React Router works correctly.

Or create `_redirects` in your build output (Vite already handles this).

---

## 📊 Performance & Analytics

### Enable Web Analytics (Free)

1. **Go to Cloudflare Dashboard**
2. **Select your domain**
3. Click **"Analytics"** → **"Web Analytics"**
4. Enable Web Analytics
5. Copy the script tag
6. Add to your `index.html` before `</body>`

### Cloudflare Features

**Automatically enabled:**
- ✅ Global CDN
- ✅ DDoS protection
- ✅ SSL/TLS encryption
- ✅ HTTP/2 & HTTP/3
- ✅ Brotli compression
- ✅ Auto-minify

---

## 🔧 Build Optimization

### Recommended vite.config.js

Your current config is already optimized! But here's the reference:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
```

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Command failed"**

**Solution:**
1. Check build works locally: `npm run build`
2. Ensure `package.json` has correct scripts
3. Check Node version: Add env var `NODE_VERSION=18`
4. View build logs in Cloudflare dashboard

**Error: "Module not found"**

**Solution:**
1. Make sure all dependencies are in `package.json`
2. Not in `devDependencies` if needed for build
3. Run `npm install` and commit `package-lock.json`

### Environment Variables Not Working

**Solution:**
1. Ensure they start with `VITE_` for frontend
2. Redeploy after adding env vars
3. Check they're in production environment (not just preview)

### Site Shows Old Version

**Solution:**
1. Clear Cloudflare cache:
   - Dashboard → Caching → Configuration
   - Click "Purge Everything"
2. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Custom Domain Not Working

**Solution:**
1. Check DNS settings in Cloudflare
2. Ensure proxy is enabled (orange cloud)
3. Wait 5-10 minutes for DNS propagation
4. Try in incognito/private browsing mode

### SSL Certificate Error

**Solution:**
1. Ensure SSL/TLS encryption mode is "Full" or "Full (strict)"
2. Cloudflare Dashboard → SSL/TLS → Overview
3. Wait 15 minutes for certificate provisioning

---

## 📈 Performance Tips

### 1. Enable Cloudflare Caching

- **Automatic** for static assets
- **Browser Cache TTL:** 4 hours (default)
- **Edge Cache TTL:** Auto

### 2. Enable Rocket Loader

Dashboard → Speed → Optimization:
- ✅ Auto Minify (JS, CSS, HTML)
- ✅ Brotli compression
- ⚠️ Rocket Loader (test first - may break some sites)

### 3. Enable Early Hints

Dashboard → Speed → Optimization:
- ✅ Early Hints (HTTP 103)

### 4. Optimize Images

Convert images to WebP format:
```bash
# Install sharp
npm install sharp

# Convert images
npx sharp -i input.png -o output.webp
```

---

## 🔒 Security

### Enable Security Features

**Automatically enabled:**
- ✅ DDoS protection
- ✅ SSL/TLS encryption
- ✅ Bot fight mode

**Recommended:**

1. **Enable HSTS**
   - Dashboard → SSL/TLS → Edge Certificates
   - Enable HSTS with max age 1 year

2. **Enable Security Headers**
   Create `_headers` file in `public/`:
   ```
   /*
     X-Frame-Options: SAMEORIGIN
     X-Content-Type-Options: nosniff
     X-XSS-Protection: 1; mode=block
     Referrer-Policy: strict-origin-when-cross-origin
   ```

3. **Enable Bot Fight Mode**
   - Dashboard → Security → Bots
   - Enable "Bot Fight Mode"

---

## 💰 Pricing

**Cloudflare Pages - FREE Plan includes:**
- ✅ Unlimited sites
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ 1 build at a time
- ✅ Global CDN

**Paid Plans ($20/month):**
- 5,000 builds per month
- 5 concurrent builds
- Advanced features

**For most startups, FREE plan is more than enough!**

---

## 🔄 Update Your Site

### Automatic (Recommended)

Just push to GitHub:
```bash
git add .
git commit -m "Update content"
git push origin main
```

Cloudflare auto-deploys!

### Manual

```bash
npm run build
wrangler pages deploy dist
```

---

## 📊 Monitoring

### View Analytics

1. **Cloudflare Dashboard**
   - Pages → Your Project → Analytics
   - See requests, bandwidth, errors

2. **Real-time Logs**
   - Deployments → Click on deployment
   - View build logs

3. **Uptime Monitoring**
   - Use external service like:
     - UptimeRobot (free)
     - Pingdom
     - StatusCake

---

## ✅ Post-Deployment Checklist

After deploying to Cloudflare:

- [ ] Website loads at custom domain
- [ ] SSL certificate is active (https://)
- [ ] All pages accessible
- [ ] Waitlist form works
- [ ] Google Sheets receives emails
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Set up uptime monitoring
- [ ] Enable Web Analytics

---

## 🎉 You're Live!

Your website is now:
- ✅ Deployed on Cloudflare's global CDN
- ✅ Accessible at your custom domain
- ✅ Protected by DDoS protection
- ✅ Secured with SSL/TLS
- ✅ Auto-deploying on every push

---

## 📞 Support

**Cloudflare Support:**
- Community: https://community.cloudflare.com
- Docs: https://developers.cloudflare.com/pages

**Project Support:**
- Email: info@navamay.com

---

## 🚀 Quick Command Reference

```bash
# Build locally
npm run build

# Preview build
npm run preview

# Deploy via CLI
wrangler pages deploy dist --project-name=navamay

# View deployments
wrangler pages deployment list

# View logs
wrangler pages deployment tail
```

---

**Congratulations! Your Navamay website is live on Cloudflare! 🎊**
