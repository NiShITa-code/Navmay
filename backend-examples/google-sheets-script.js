/**
 * Google Apps Script for Waitlist Collection
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Google Sheets and create a new spreadsheet
 * 2. Name it "Navamay Waitlist"
 * 3. Add headers in first row: Email | Product | Timestamp
 * 4. Go to Extensions → Apps Script
 * 5. Paste this code
 * 6. Deploy → New Deployment → Web App
 * 7. Set "Execute as: Me" and "Who has access: Anyone"
 * 8. Copy the Web App URL
 * 9. Add to .env: VITE_GOOGLE_SCRIPT_URL=your_url_here
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the request data
    const data = JSON.parse(e.postData.contents);

    // Extract values
    const email = data.email || '';
    const product = data.product || 'CliniqBot';
    const timestamp = data.timestamp || new Date().toISOString();

    // Check if email already exists
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();

    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === email) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            message: 'Email already exists'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Append new row
    sheet.appendRow([email, product, timestamp]);

    // Send email notification (optional)
    // MailApp.sendEmail({
    //   to: 'your-email@example.com',
    //   subject: 'New Waitlist Signup!',
    //   body: `New signup: ${email}`
    // });

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Successfully joined waitlist'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this to test
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        product: 'CliniqBot',
        timestamp: new Date().toISOString()
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
