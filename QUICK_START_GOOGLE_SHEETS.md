# 🚀 Quick Start - Google Sheets Backend

**Total time: 10 minutes** | **Cost: FREE forever**

Follow these simple steps to collect waitlist emails in Google Sheets!

---

## ✅ Step 1: Create Google Sheet (2 min)

1. Go to https://sheets.google.com
2. Click **+ Blank** to create new sheet
3. Name it: **"Navmay Waitlist"**
4. In Row 1, add headers:
   - A1: `Email`
   - B1: `Product`
   - C1: `Timestamp`

**Done!** Your sheet should look like:
```
| Email | Product | Timestamp |
|-------|---------|-----------|
```

---

## ✅ Step 2: Add Google Apps Script (3 min)

1. In your sheet, go to **Extensions → Apps Script**
2. Delete all existing code
3. Copy & paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const email = data.email || '';
    const product = data.product || 'CliniqBot';
    const timestamp = data.timestamp || new Date().toISOString();

    // Check if email exists
    const existingData = sheet.getDataRange().getValues();
    for (let i = 1; i < existingData.length; i++) {
      if (existingData[i][0] === email) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false, message: 'Email already exists'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Add new row
    sheet.appendRow([email, product, timestamp]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true, message: 'Successfully joined waitlist'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false, message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **💾 Save** (name it "Waitlist Handler")

---

## ✅ Step 3: Deploy as Web App (2 min)

1. Click **Deploy → New deployment**
2. Click **⚙️ gear icon** → Select **"Web app"**
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone ⚠️
4. Click **Deploy**
5. Authorize if prompted
6. **COPY the Web App URL!**
   - Looks like: `https://script.google.com/macros/s/AKfycbz.../exec`

---

## ✅ Step 4: Update Your Project (1 min)

1. Open `.env` file in your project
2. Paste your URL:
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_URL_HERE/exec
   ```
3. Save the file

---

## ✅ Step 5: Test Locally (1 min)

```bash
npm run dev
```

1. Open http://localhost:3000
2. Click CliniqBot → Join Waitlist
3. Enter test email: `test@example.com`
4. Submit!
5. **Check your Google Sheet** - email should appear! 🎉

---

## ✅ Step 6: Deploy to Production (1 min)

```bash
vercel --prod
```

**Add environment variable in Vercel:**
1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add:
   - Name: `VITE_GOOGLE_SCRIPT_URL`
   - Value: Your Google Script URL
4. Save & Redeploy: `vercel --prod`

---

## 🎉 Done! Your Waitlist is Live!

**View emails:**
- Go to https://sheets.google.com
- Open "Navmay Waitlist"
- See all signups in real-time!

**Export data:**
- File → Download → CSV or Excel

---

## 📚 Need More Details?

See **GOOGLE_SHEETS_SETUP.md** for:
- Detailed explanations
- Troubleshooting
- Email notifications
- Analytics setup
- Security info

---

**Questions?** Email: admin@cliniqbot.com

**Happy collecting! 📧✨**
