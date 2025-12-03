# 📊 Google Sheets Backend Setup - Step by Step

Complete guide to set up Google Sheets as your waitlist database. **Estimated time: 10 minutes**

---

## 🎯 What You'll Get

- ✅ All waitlist emails automatically saved to Google Sheets
- ✅ Real-time updates
- ✅ Easy to view, sort, and export data
- ✅ Completely FREE forever
- ✅ No coding on your computer required

---

## 📝 Step-by-Step Setup

### Step 1: Create Your Google Sheet (2 minutes)

1. **Go to Google Sheets**
   - Open https://sheets.google.com
   - Sign in with your Google account

2. **Create New Spreadsheet**
   - Click **"+ Blank"** to create a new sheet
   - Name it: **"Navamay Waitlist"** (click on "Untitled spreadsheet" at the top)

3. **Set Up Column Headers**
   In Row 1, add these headers:
   - **Cell A1:** `Email`
   - **Cell B1:** `Product`
   - **Cell C1:** `Timestamp`

   Your sheet should look like this:
   ```
   | Email | Product | Timestamp |
   |-------|---------|-----------|
   |       |         |           |
   ```

4. **Format the sheet (optional but nice)**
   - Select Row 1 (the header row)
   - Click **Format → Text → Bold**
   - Click **Format → Fill color** → Choose a light blue or gray
   - Adjust column widths by double-clicking column borders

✅ **Sheet created!**

---

### Step 2: Create Google Apps Script (3 minutes)

1. **Open Script Editor**
   - In your Google Sheet, go to **Extensions → Apps Script**
   - A new tab will open with the script editor

2. **Delete Existing Code**
   - You'll see some default code like `function myFunction() {}`
   - Select ALL the code and delete it

3. **Paste This Code**
   Copy and paste this entire script:

```javascript
/**
 * Navamay Waitlist Handler
 * Automatically saves email submissions to this Google Sheet
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse incoming data
    const data = JSON.parse(e.postData.contents);

    // Extract values
    const email = data.email || '';
    const product = data.product || 'ClinicBot';
    const timestamp = data.timestamp || new Date().toISOString();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return createResponse(false, 'Invalid email address');
    }

    // Check if email already exists
    const existingData = sheet.getDataRange().getValues();
    for (let i = 1; i < existingData.length; i++) {
      if (existingData[i][0] === email) {
        return createResponse(false, 'This email is already on the waitlist');
      }
    }

    // Add new row with email data
    sheet.appendRow([email, product, timestamp]);

    // Log success
    console.log('New signup: ' + email);

    // Optional: Send yourself an email notification
    // Uncomment the lines below to get email alerts
    // MailApp.sendEmail({
    //   to: 'your-email@example.com',
    //   subject: '🎉 New ClinicBot Waitlist Signup!',
    //   body: 'New email: ' + email + '\nTime: ' + timestamp
    // });

    return createResponse(true, 'Successfully joined the waitlist');

  } catch (error) {
    console.error('Error: ' + error.toString());
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Create JSON response
 */
function createResponse(success, message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: success,
      message: message
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - Run this to test before deploying
 */
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        product: 'ClinicBot',
        timestamp: new Date().toISOString()
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());

  // Check your sheet - should see test@example.com added!
}
```

4. **Save the Script**
   - Click the **💾 Save** icon (or press Ctrl+S / Cmd+S)
   - When prompted, name the project: **"Waitlist Handler"**

5. **Test the Script (Optional but Recommended)**
   - In the toolbar, select function: **testPost**
   - Click **▶ Run**
   - You'll see a permission dialog - click **Review permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to Waitlist Handler (unsafe)**
   - Click **Allow**
   - Go back to your spreadsheet - you should see a new row with "test@example.com"!
   - If it worked, you can delete that test row

✅ **Script created and tested!**

---

### Step 3: Deploy as Web App (2 minutes)

1. **Start Deployment**
   - In the Apps Script editor, click **Deploy** (top right) → **New deployment**

2. **Configure Deployment**
   - Click the **⚙️ gear icon** next to "Select type"
   - Choose **"Web app"**

3. **Set Permissions**
   - **Description:** "Waitlist API v1"
   - **Execute as:** Select **"Me (your-email@gmail.com)"**
   - **Who has access:** Select **"Anyone"** ⚠️ Important!

4. **Deploy**
   - Click **Deploy**
   - You might need to authorize again - click **Authorize access**
   - Choose your account and allow

5. **Copy Your Web App URL**
   - You'll see a screen with **"Web app URL"**
   - It looks like: `https://script.google.com/macros/s/AKfycbz.../exec`
   - **COPY THIS URL!** You'll need it in the next step

✅ **Web app deployed!**

---

### Step 4: Update Your Website Code (2 minutes)

1. **Update Environment Variables**

   Open the file `.env` in your project and update it:

   ```env
   # Replace YOUR_GOOGLE_SCRIPT_URL_HERE with the URL you copied
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbz.../exec

   VITE_ENV=development
   ```

2. **Save the file**

✅ **Configuration complete!**

---

### Step 5: Test Your Website Locally (1 minute)

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Open Your Website**
   - Go to http://localhost:3000
   - Click on the ClinicBot product card
   - Enter a test email: `test@yourname.com`
   - Click "Join Waitlist"

3. **Check Results**
   - You should see success message on website
   - Go back to your Google Sheet
   - **Refresh the page**
   - You should see your test email appear! 🎉

✅ **Working locally!**

---

### Step 6: Deploy to Production

Now that it works locally, deploy to Vercel:

```bash
vercel --prod
```

**Important:** Add the environment variable in Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add:
   - **Name:** `VITE_GOOGLE_SCRIPT_URL`
   - **Value:** Your Google Script URL (from Step 3)
5. Click **Save**
6. Redeploy: `vercel --prod`

✅ **Live and collecting emails!**

---

## 📊 Viewing Your Waitlist Data

### In Google Sheets

1. **Open your Google Sheet**
   - Go to https://sheets.google.com
   - Open "Navamay Waitlist"

2. **See all signups in real-time!**
   - Each row = one signup
   - Automatically sorted by signup time

### Sorting & Filtering

**Sort by date (newest first):**
- Select all data (Column A to C)
- Click **Data → Sort range**
- Sort by: Column C (Timestamp)
- Order: Z → A (descending)

**Remove duplicates:**
- Select data range
- Click **Data → Data cleanup → Remove duplicates**

**Filter by product:**
- Click **Data → Create a filter**
- Click filter icon on "Product" column
- Select products to show

### Exporting Data

**Export to CSV:**
- Click **File → Download → Comma-separated values (.csv)**

**Export to Excel:**
- Click **File → Download → Microsoft Excel (.xlsx)**

**Copy to clipboard:**
- Select the data you want
- Ctrl+C (or Cmd+C)
- Paste into any application

---

## 📧 Optional: Email Notifications

Want to get an email every time someone signs up?

1. **Open your Apps Script**
2. **Find these lines** (around line 30):
   ```javascript
   // Optional: Send yourself an email notification
   // Uncomment the lines below to get email alerts
   // MailApp.sendEmail({
   ```

3. **Uncomment and update:**
   ```javascript
   // Remove the // from these lines:
   MailApp.sendEmail({
     to: 'your-email@example.com',  // Change to YOUR email
     subject: '🎉 New ClinicBot Waitlist Signup!',
     body: 'New email: ' + email + '\nTime: ' + timestamp
   });
   ```

4. **Save and Redeploy:**
   - Click **Save**
   - Click **Deploy → Manage deployments**
   - Click **✏️ Edit** on your deployment
   - Click **Deploy**
   - Select **New version**
   - Click **Deploy**

Now you'll get an email for every signup!

---

## 🔒 Security & Privacy

### Current Setup
- ✅ Anyone can submit to the form (public waitlist)
- ✅ Only you can view the Google Sheet
- ✅ Script runs under your account
- ✅ No authentication required (good for public waitlist)

### Making Sheet Private
Your Google Sheet is already private by default:
- Only people you share it with can view it
- The script can write to it, but users can't access the sheet directly

### Sharing with Team Members
To let others view the waitlist:
1. Click **Share** (top right in Google Sheet)
2. Add email addresses
3. Choose permission level:
   - **Viewer:** Can only view data
   - **Editor:** Can edit data

---

## 🐛 Troubleshooting

### Problem: "Failed to join waitlist" error

**Solution:**
1. Check the Google Script URL in `.env` is correct
2. Make sure script is deployed as "Anyone" can access
3. Check browser console for errors (F12)

### Problem: Email submitted but not appearing in sheet

**Solution:**
1. Refresh your Google Sheet (F5)
2. Check if script is running: Apps Script → **Executions** tab
3. Look for errors in execution log
4. Make sure columns are: Email, Product, Timestamp (in that order)

### Problem: "Authorization required" error

**Solution:**
1. Go to Apps Script editor
2. Run the `testPost` function
3. Authorize the script again
4. Redeploy: Deploy → Manage deployments → Edit → Deploy

### Problem: CORS error in console

**Solution:**
This is normal! Google Apps Script uses `no-cors` mode.
The submission still works - check your Google Sheet to confirm.

### Problem: Environment variable not loading

**Solution:**
1. Make sure it starts with `VITE_`
2. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again
3. For production: Add variable in Vercel dashboard and redeploy

---

## 📈 Analytics & Insights

### Track Signups Over Time

1. **Create a Chart**
   - Select your data (including headers)
   - Click **Insert → Chart**
   - Chart type: **Line chart** or **Column chart**
   - X-axis: Timestamp
   - Y-axis: Count of emails

2. **See Daily Signups**
   Add a formula in a new column:
   ```
   =COUNTIF(C:C, ">="&TODAY())
   ```
   This shows signups today!

### Create a Dashboard

1. **Add a summary section** at the top:
   ```
   Total Signups: =COUNTA(A2:A) - 1
   Today: =COUNTIF(C:C, ">="&TODAY())
   This Week: =COUNTIF(C:C, ">="&TODAY()-7)
   ```

---

## 🎉 You're All Set!

Your waitlist is now:
- ✅ Collecting emails automatically
- ✅ Saving to Google Sheets
- ✅ Easy to view and export
- ✅ Completely free
- ✅ Production ready!

### Quick Reference

**View emails:**
https://sheets.google.com → "Navamay Waitlist"

**Edit script:**
Open sheet → Extensions → Apps Script

**Test locally:**
```bash
npm run dev
```

**Deploy updates:**
```bash
vercel --prod
```

---

## 🆘 Need Help?

If something's not working:
1. Check this guide again
2. Look at the troubleshooting section
3. Check browser console for errors (F12)
4. Email: info@navamay.com

---

**Happy collecting! 📧✨**
