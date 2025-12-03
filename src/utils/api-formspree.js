/**
 * API Utility Functions - Formspree Integration
 *
 * This version uses Formspree to collect waitlist emails
 * No backend server required!
 */

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'YOUR_FORM_ID'

/**
 * Submit email to waitlist via Formspree
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response data
 */
export const submitWaitlistEmail = async (email) => {
  // Validate email
  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address')
  }

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        product: 'CliniqBot',
        timestamp: new Date().toISOString(),
        _subject: 'New CliniqBot Waitlist Signup!',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to join waitlist. Please try again.')
    }

    const data = await response.json()

    console.log('✅ Waitlist signup successful:', email)

    return {
      success: true,
      message: 'Successfully joined the waitlist',
      data: { email }
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
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
 * Get all waitlist emails (Not available with Formspree)
 * Use Formspree dashboard to view submissions
 */
export const getWaitlistEmails = () => {
  console.warn('View submissions at: https://formspree.io/forms')
  return []
}
