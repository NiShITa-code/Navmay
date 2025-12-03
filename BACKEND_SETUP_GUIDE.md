# 📧 Complete Backend Setup Guide for Waitlist

This guide shows you how to collect email addresses from your waitlist. Choose the option that fits your needs.

---

## 🎯 Quick Comparison

| Option | Cost | Difficulty | Setup Time | Best For |
|--------|------|------------|------------|----------|
| **Formspree** | Free (50/mo) | ⭐ Easy | 5 min | Quick start, no coding |
| **Google Sheets** | Free | ⭐ Easy | 10 min | Simple spreadsheet storage |
| **Vercel + Supabase** | Free | ⭐⭐ Medium | 20 min | Scalable, professional |
| **Full Backend** | Variable | ⭐⭐⭐ Hard | 1 hour | Complete control |

---

## Option 1: Formspree (Recommended for Quick Start) ⭐

**Perfect if you want emails sent directly to your inbox!**

### Step 1: Create Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for free account
3. Click **"New Form"**
4. Name it: `CliniqBot Waitlist`
5. Copy your **Form ID** (looks like: `abc123xyz`)

### Step 2: Update Your Code

Replace `src/utils/api.js` with the Formspree version:

```bash
cp src/utils/api-formspree.js src/utils/api.js
```

Or manually update `src/utils/api.js`:

```javascript
const FORMSPREE_FORM_ID = 'YOUR_FORM_ID_HERE' // Paste your form ID

export const submitWaitlistEmail = async (email) => {
  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address')
  }

  const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      product: 'CliniqBot',
      _subject: 'New CliniqBot Waitlist Signup!',
    }),
  })

  if (!response.ok) throw new Error('Failed to join waitlist')

  return { success: true, message: 'Successfully joined the waitlist' }
}

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
```

### Step 3: Update Environment Variables

Edit `.env`:
```env
VITE_FORMSPREE_FORM_ID=abc123xyz
```

### Step 4: Test & Deploy

```bash
npm run dev
```

Test the waitlist form. Check your email inbox for notifications!

### Step 5: View Submissions

- Go to [Formspree Dashboard](https://formspree.io/forms)
- Click on your form
- See all submissions
- Export to CSV anytime

**✅ Done! Super easy!**

---

## Option 2: Google Sheets (Best for Simple Tracking)

**Perfect if you want all emails in a spreadsheet!**

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: **"Navamay Waitlist"**
3. Add headers in Row 1:
   - Column A: `Email`
   - Column B: `Product`
   - Column C: `Timestamp`

### Step 2: Create Apps Script

1. In your sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const email = data.email || '';
    const product = data.product || 'CliniqBot';
    const timestamp = data.timestamp || new Date().toISOString();

    // Check if email already exists
    const values = sheet.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === email) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          message: 'Email already exists'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Add new row
    sheet.appendRow([email, product, timestamp]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Successfully joined waitlist'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (disk icon)
5. Name it: `Waitlist Handler`

### Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click gear icon → Select **"Web app"**
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. **Copy the Web App URL** (looks like: `https://script.google.com/...`)

### Step 4: Update Your Code

Replace `src/utils/api.js`:

```bash
cp src/utils/api-googlesheets.js src/utils/api.js
```

Or update manually - see `src/utils/api-googlesheets.js`

### Step 5: Update Environment Variables

Edit `.env`:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/YOUR_URL_HERE
```

### Step 6: Test

```bash
npm run dev
```

Submit a test email. Check your Google Sheet - new row should appear!

**✅ All emails now save to Google Sheets!**

---

## Option 3: Vercel + Supabase (Professional & Scalable) ⭐

**Perfect for production-ready setup!**

### Part A: Setup Supabase (Database)

#### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for free
3. Click **"New Project"**
4. Name: `navamay-waitlist`
5. Create strong database password
6. Select region closest to you
7. Wait 2 minutes for project to initialize

#### Step 2: Create Database Table

1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Paste this SQL:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  product TEXT DEFAULT 'CliniqBot',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- Add row level security (optional but recommended)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (for public waitlist)
CREATE POLICY "Anyone can insert" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Only you can view (via your admin panel)
CREATE POLICY "Only authenticated users can view" ON waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

4. Click **"Run"**
5. ✅ Table created!

#### Step 3: Get API Credentials

1. Go to **Settings → API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### Part B: Setup Vercel Function

#### Step 1: Install Supabase Package

```bash
npm install @supabase/supabase-js
```

#### Step 2: The Serverless Function Already Exists!

Check `api/waitlist.js` - I already created it for you!

#### Step 3: Update Environment Variables

Edit `.env`:
```env
VITE_API_URL=/api
VITE_WAITLIST_ENDPOINT=/waitlist
VITE_ENV=production

# Add these for the serverless function
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

#### Step 4: Update package.json Dependencies

Make sure these are in `package.json`:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "axios": "^1.7.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

Run:
```bash
npm install
```

#### Step 5: Update api.js to Use Your API

Update `src/utils/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api'
const USE_MOCK_API = false // Set to false to use real API

export const submitWaitlistEmail = async (email) => {
  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address')
  }

  const response = await fetch(`${API_URL}/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to join waitlist')
  }

  return await response.json()
}

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
```

#### Step 6: Deploy to Vercel

```bash
# Deploy
vercel --prod

# Add environment variables in Vercel Dashboard
# Project Settings → Environment Variables → Add:
#   SUPABASE_URL
#   SUPABASE_ANON_KEY
```

#### Step 7: View Your Data

**Option 1: Supabase Dashboard**
1. Go to your Supabase project
2. Click **Table Editor**
3. Select `waitlist` table
4. See all signups!

**Option 2: Export to CSV**
```sql
COPY waitlist TO '/tmp/waitlist.csv' CSV HEADER;
```

**✅ Professional setup complete!**

---

## Option 4: Email Notification Only (Simplest!)

**Just want emails sent to you? No database needed!**

### Using SendGrid (100 emails/day free)

#### Step 1: Setup SendGrid

1. Go to [https://sendgrid.com](https://sendgrid.com)
2. Sign up for free (no credit card required)
3. Verify your email
4. Go to **Settings → API Keys**
5. Create API Key
6. Copy the API key

#### Step 2: Install SendGrid

```bash
npm install @sendgrid/mail
```

#### Step 3: Update Vercel Function

The function in `api/waitlist.js` already supports SendGrid!

Just add environment variables:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
ADMIN_EMAIL=your-email@example.com
FROM_EMAIL=noreply@yourdomain.com
```

#### Step 4: Deploy

```bash
vercel --prod
```

Now you'll get an email every time someone joins the waitlist!

---

## 🔧 Updating Your Frontend

Whichever option you choose, make sure your frontend uses the right API file:

```bash
# For Formspree
cp src/utils/api-formspree.js src/utils/api.js

# For Google Sheets
cp src/utils/api-googlesheets.js src/utils/api.js

# For Supabase/Vercel - already configured in src/utils/api.js
```

---

## 🧪 Testing Your Setup

### Test Locally

```bash
npm run dev
```

1. Open http://localhost:3000
2. Click on CliniqBot product
3. Enter test email: `test@example.com`
4. Click "Join Waitlist"
5. Check:
   - Success message appears
   - Email saved (check your chosen platform)
   - No console errors

### Test Production

After deploying:
1. Visit your live website
2. Test waitlist signup
3. Verify email is received/saved
4. Test error cases (duplicate email, invalid email)

---

## 📊 Viewing Your Waitlist

### Formspree
- Dashboard: https://formspree.io/forms
- Export to CSV available

### Google Sheets
- Open your Google Sheet
- All data automatically updates
- Can sort, filter, export

### Supabase
- Table Editor in dashboard
- SQL queries for analysis
- Export to CSV

---

## 🎯 My Recommendation

**For you, I recommend:**

1. **Start with Formspree** (5 minutes)
   - Get started immediately
   - No coding required
   - Emails to your inbox

2. **Later, upgrade to Vercel + Supabase** (when you have 50+ signups)
   - More scalable
   - Better analytics
   - Professional setup

---

## 🆘 Troubleshooting

### "Failed to join waitlist" error

**Formspree:**
- Check form ID is correct
- Verify form is active

**Google Sheets:**
- Check script URL is correct
- Ensure script permissions are set to "Anyone"

**Supabase:**
- Verify SUPABASE_URL and SUPABASE_ANON_KEY
- Check table was created correctly
- Review Vercel function logs

### CORS errors

Add CORS headers in your backend:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*')
```

### Environment variables not working

- Ensure they start with `VITE_` in frontend
- Restart dev server after changing `.env`
- Redeploy to Vercel after adding env vars in dashboard

---

## 📞 Need Help?

Contact: admin@cliniqbot.com

---

Choose your option and let's get your waitlist live! 🚀
