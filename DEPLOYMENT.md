# 🚀 Production Deployment Guide

Complete step-by-step guide to deploy Navmay website to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Quick Deploy (Vercel - 5 minutes)](#quick-deploy-vercel)
3. [Deploy to Netlify](#deploy-to-netlify)
4. [Deploy to AWS](#deploy-to-aws)
5. [Deploy with Docker](#deploy-with-docker)
6. [Backend Setup](#backend-setup)
7. [Domain Configuration](#domain-configuration)
8. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All components are working locally
- [ ] Production build runs successfully (`npm run build`)
- [ ] Environment variables are configured
- [ ] Backend API is ready (or use localStorage for testing)
- [ ] Domain is purchased (optional)
- [ ] SSL certificate ready (auto-configured by most platforms)

---

## Quick Deploy (Vercel)

**Time: 5 minutes** | **Cost: Free** | **Difficulty: Easy**

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# From project root
vercel --prod
```

### Step 4: Configure Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   VITE_API_URL = https://your-backend-api.com/api
   VITE_WAITLIST_ENDPOINT = /waitlist
   VITE_ENV = production
   ```

### Step 5: Redeploy

```bash
vercel --prod
```

**Done!** Your site is live at `https://your-project.vercel.app`

---

## Deploy to Netlify

**Time: 10 minutes** | **Cost: Free** | **Difficulty: Easy**

### Method 1: Netlify CLI

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Login

```bash
netlify login
```

#### Step 3: Initialize

```bash
netlify init
```

#### Step 4: Build and Deploy

```bash
npm run build
netlify deploy --prod --dir=dist
```

#### Step 5: Environment Variables

```bash
netlify env:set VITE_API_URL "https://your-api.com/api"
netlify env:set VITE_WAITLIST_ENDPOINT "/waitlist"
netlify env:set VITE_ENV "production"
```

### Method 2: Git Integration (Recommended)

1. **Push to GitHub/GitLab**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Configure:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Add Environment Variables**
   - Site Settings → Environment Variables
   - Add all `VITE_*` variables

4. **Deploy**
   - Click "Deploy site"
   - Auto-deploys on every git push!

---

## Deploy to AWS

**Time: 30 minutes** | **Cost: ~$1-5/month** | **Difficulty: Medium**

### Prerequisites

- AWS Account
- AWS CLI installed
- Domain (optional)

### Step 1: Build the Project

```bash
npm run build
```

### Step 2: Create S3 Bucket

```bash
aws s3 mb s3://navmay-website
```

### Step 3: Enable Static Website Hosting

```bash
aws s3 website s3://navmay-website \
  --index-document index.html \
  --error-document index.html
```

### Step 4: Set Bucket Policy

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::navmay-website/*"
    }
  ]
}
```

Apply policy:

```bash
aws s3api put-bucket-policy \
  --bucket navmay-website \
  --policy file://bucket-policy.json
```

### Step 5: Upload Files

```bash
aws s3 sync dist/ s3://navmay-website --delete
```

### Step 6: Setup CloudFront (CDN)

1. Go to AWS CloudFront Console
2. Create Distribution:
   - **Origin Domain**: `navmay-website.s3.amazonaws.com`
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Default Root Object**: `index.html`
3. Create **Error Pages**:
   - 403 → `/index.html` (for React Router)
   - 404 → `/index.html`

### Step 7: Get CloudFront URL

Your site is now available at:
```
https://d1234567890.cloudfront.net
```

### Step 8: Continuous Deployment

Create `deploy.sh`:

```bash
#!/bin/bash
npm run build
aws s3 sync dist/ s3://navmay-website --delete
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

Run on updates:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Deploy with Docker

**Time: 15 minutes** | **Difficulty: Medium**

### Step 1: Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config for SPA routing
RUN echo 'server {  \
  listen 80;  \
  location / {  \
    root /usr/share/nginx/html;  \
    try_files $uri $uri/ /index.html;  \
  }  \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Create .dockerignore

```
node_modules
dist
.git
.env
.env.local
*.log
```

### Step 3: Build Image

```bash
docker build -t navmay-web:latest .
```

### Step 4: Run Locally (Test)

```bash
docker run -p 8080:80 navmay-web:latest
```

Visit: `http://localhost:8080`

### Step 5: Deploy to Cloud

#### Docker Hub + DigitalOcean/AWS

```bash
# Push to Docker Hub
docker tag navmay-web:latest yourusername/navmay-web:latest
docker push yourusername/navmay-web:latest

# On server
docker pull yourusername/navmay-web:latest
docker run -d -p 80:80 --name navmay navmay-web:latest
```

#### Docker Compose (Production)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    image: navmay-web:latest
    ports:
      - "80:80"
      - "443:443"
    restart: unless-stopped
    volumes:
      - ./ssl:/etc/nginx/ssl
```

Deploy:
```bash
docker-compose up -d
```

---

## Backend Setup

You need a backend to handle waitlist emails in production.

### Option 1: Quick Backend (Vercel Serverless)

Create `/api/waitlist.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, created_at: new Date() }])

    if (error) throw error

    res.json({ success: true, message: 'Successfully joined waitlist' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
```

### Option 2: Full Backend (Express + MongoDB)

See `README.md` for complete backend examples.

### Option 3: No Backend (Email Services)

#### Use Formspree

1. Sign up at [Formspree.io](https://formspree.io)
2. Create form
3. Update `src/utils/api.js`:

```javascript
const submitToBackend = async (email) => {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  return response.json()
}
```

---

## Domain Configuration

### Step 1: Purchase Domain

Recommended registrars:
- Namecheap
- Google Domains
- GoDaddy

### Step 2: Configure DNS

#### For Vercel:

Add DNS records:
```
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

#### For Netlify:

Add DNS records:
```
A     @       75.2.60.5
CNAME www     your-site.netlify.app
```

#### For CloudFront:

Add DNS record:
```
CNAME @  d1234567890.cloudfront.net
```

### Step 3: Enable HTTPS

Most platforms auto-configure SSL. If manual:

1. Get certificate from [Let's Encrypt](https://letsencrypt.org)
2. Upload to your hosting platform

---

## Post-Deployment

### 1. Test Everything

- [ ] Homepage loads
- [ ] All sections scroll smoothly
- [ ] Waitlist modal opens
- [ ] Email submission works
- [ ] Mobile responsive
- [ ] All links work
- [ ] No console errors

### 2. Setup Analytics

Add Google Analytics in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Setup Monitoring

- **Uptime**: Use [UptimeRobot](https://uptimerobot.com)
- **Performance**: Use [Google PageSpeed Insights](https://pagespeed.web.dev)
- **Errors**: Use [Sentry](https://sentry.io)

### 4. SEO Optimization

- [ ] Submit sitemap to Google Search Console
- [ ] Add meta descriptions
- [ ] Optimize images
- [ ] Add schema markup

### 5. Security

- [ ] Enable HTTPS
- [ ] Add security headers
- [ ] Configure CORS
- [ ] Rate limit API endpoints

---

## Troubleshooting

### Build Errors

```bash
# Clear everything and rebuild
rm -rf node_modules dist package-lock.json
npm install
npm run build
```

### White Screen After Deploy

- Check console for errors
- Ensure correct base path in `vite.config.js`
- Verify all environment variables are set

### API Not Working

- Check CORS settings
- Verify environment variables
- Test API endpoint directly
- Check network tab in browser devtools

### 404 on Refresh

Configure server for SPA routing:
- **Nginx**: `try_files $uri $uri/ /index.html;`
- **Vercel**: Auto-configured
- **Netlify**: Add `_redirects` file: `/* /index.html 200`

---

## Need Help?

Contact: admin@cliniqbot.com

---

**Happy Deploying! 🚀**
