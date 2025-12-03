import { useState } from 'react'
import { submitWaitlistEmail } from '../utils/api'
import './WaitlistModal.css'

const WaitlistModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await submitWaitlistEmail(email)
      setSuccess(true)
      setEmail('')

      // Close modal after 3 seconds
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 3000)
    } catch (err) {
      setError(err.message || 'Failed to join waitlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setEmail('')
      setError('')
      setSuccess(false)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} disabled={loading}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          </div>

          <h2>CliniqBot</h2>
          <span className="status-badge">Coming Soon</span>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            CliniqBot is revolutionizing healthcare access with AI-powered appointment booking
            through WhatsApp and a comprehensive dashboard for doctors to manage their practice efficiently.
          </p>

          <div className="feature-highlights">
            <div className="highlight">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>WhatsApp Booking</span>
            </div>
            <div className="highlight">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Smart Scheduling</span>
            </div>
            <div className="highlight">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>24/7 Available</span>
            </div>
          </div>

          {!success ? (
            <>
              <h3>Join the Waitlist</h3>
              <p className="waitlist-subtitle">
                Be the first to know when we launch CliniqBot!
              </p>

              <form onSubmit={handleSubmit} className="waitlist-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="email-input"
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>You're on the list!</h3>
              <p>Thank you for joining our waitlist. We'll notify you when CliniqBot launches.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WaitlistModal
