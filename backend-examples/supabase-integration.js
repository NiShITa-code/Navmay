/**
 * Supabase Integration for Waitlist
 *
 * Supabase is a free PostgreSQL database with a great API
 * Free tier: 500MB database, 50,000 monthly active users
 *
 * SETUP:
 * 1. Go to https://supabase.com
 * 2. Create a new project
 * 3. Create a table named 'waitlist':
 *    - id: int8 (primary key, auto-increment)
 *    - email: text (unique)
 *    - product: text (default 'ClinicBot')
 *    - created_at: timestamp (default now())
 * 4. Get your API URL and anon key from Settings → API
 * 5. Install: npm install @supabase/supabase-js
 */

// For Vercel Serverless Function
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email,
          product: 'ClinicBot',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      // Check if email already exists
      if (error.code === '23505') {
        return res.status(400).json({
          success: false,
          message: 'This email is already on the waitlist'
        });
      }
      throw error;
    }

    console.log('✅ New signup:', email);

    return res.status(200).json({
      success: true,
      message: 'Successfully joined the waitlist',
      data: data[0]
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process request'
    });
  }
}

// SQL to create table in Supabase:
/*
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  product TEXT DEFAULT 'ClinicBot',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);
*/
