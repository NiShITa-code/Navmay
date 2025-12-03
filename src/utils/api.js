/**
 * API Utility Functions - Google Sheets Integration
 *
 * This version uses Google Sheets as a simple database
 * via Google Apps Script Web App
 */

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'YOUR_SCRIPT_URL'

/**
 * Submit email to waitlist via Google Sheets
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response data
 */
export const submitWaitlistEmail = async (email) => {
  // Validate email
  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address')
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires this
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        product: 'ClinicBot',
        timestamp: new Date().toISOString(),
      }),
    })

    console.log('✅ Waitlist signup successful:', email)

    return {
      success: true,
      message: 'Successfully joined the waitlist',
      data: { email }
    }
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to join waitlist. Please try again.')
  }
}

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get all waitlist emails
 * View directly in your Google Sheet
 */
export const getWaitlistEmails = () => {
  console.warn('View submissions in your Google Sheet')
  return []
}
