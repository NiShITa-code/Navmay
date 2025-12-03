/**
 * API Utility Functions
 *
 * This file contains all API calls for the application.
 * Currently uses localStorage for development, but can be easily
 * switched to actual backend API calls in production.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const WAITLIST_ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT || '/waitlist'
const USE_MOCK_API = import.meta.env.VITE_ENV === 'development' || !import.meta.env.VITE_API_URL

/**
 * Submit email to waitlist
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response data
 */
export const submitWaitlistEmail = async (email) => {
  // Validate email
  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address')
  }

  // Check if email already exists in localStorage
  if (USE_MOCK_API) {
    return submitToLocalStorage(email)
  } else {
    return submitToBackend(email)
  }
}

/**
 * Submit to localStorage (Development/Mock)
 */
const submitToLocalStorage = async (email) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]')

  // Check if email already exists
  if (existingEmails.some(entry => entry.email === email)) {
    throw new Error('This email is already on the waitlist')
  }

  const newEntry = {
    email,
    timestamp: new Date().toISOString(),
    id: Date.now().toString()
  }

  existingEmails.push(newEntry)
  localStorage.setItem('waitlistEmails', JSON.stringify(existingEmails))

  console.log('✅ Waitlist signup:', newEntry)
  console.log('📧 All waitlist emails:', existingEmails)

  return {
    success: true,
    message: 'Successfully joined the waitlist',
    data: newEntry
  }
}

/**
 * Submit to Backend API (Production)
 */
const submitToBackend = async (email) => {
  try {
    const response = await fetch(`${API_URL}${WAITLIST_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to join waitlist')
    }

    const data = await response.json()
    return data
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
 * Get all waitlist emails (Development only)
 * @returns {Array} List of waitlist entries
 */
export const getWaitlistEmails = () => {
  if (USE_MOCK_API) {
    return JSON.parse(localStorage.getItem('waitlistEmails') || '[]')
  }
  console.warn('This function is only available in development mode')
  return []
}

/**
 * Export waitlist emails to CSV (Development only)
 * @returns {string} CSV string
 */
export const exportWaitlistToCSV = () => {
  const emails = getWaitlistEmails()
  if (emails.length === 0) return ''

  const headers = ['Email', 'Timestamp', 'ID']
  const rows = emails.map(entry => [entry.email, entry.timestamp, entry.id])

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  return csv
}
