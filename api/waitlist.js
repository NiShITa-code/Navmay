/**
 * Vercel Serverless Function for Waitlist
 *
 * This function runs on Vercel's edge network
 * Deploy automatically when you push to Vercel
 *
 * OPTIONS FOR DATA STORAGE:
 * 1. Vercel KV (Redis) - Easiest
 * 2. MongoDB Atlas - Free tier
 * 3. Supabase - Free PostgreSQL
 * 4. Email service (SendGrid, Mailgun)
 */

// Example with SendGrid email notification
import sgMail from '@sendgrid/mail';

// Initialize SendGrid (optional)
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // OPTION 1: Send email notification to yourself
    if (process.env.SENDGRID_API_KEY && process.env.ADMIN_EMAIL) {
      await sgMail.send({
        to: process.env.ADMIN_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: 'New ClinicBot Waitlist Signup! 🎉',
        text: `New waitlist signup: ${email}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>New Waitlist Signup!</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Product:</strong> ClinicBot</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
    }

    // OPTION 2: Save to Vercel KV (Redis)
    // const kv = require('@vercel/kv');
    // await kv.lpush('waitlist', JSON.stringify({
    //   email,
    //   timestamp: new Date().toISOString()
    // }));

    // OPTION 3: Save to MongoDB
    // See backend-examples/mongodb-vercel.js

    // OPTION 4: Save to Supabase
    // See backend-examples/supabase-vercel.js

    console.log('✅ Waitlist signup:', email);

    return res.status(200).json({
      success: true,
      message: 'Successfully joined the waitlist',
      data: { email }
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process request'
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
