import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-header">
            <span className="section-badge">Get In Touch</span>
            <h2 className="section-title">Let's Connect</h2>
            <p className="section-subtitle">
              Have questions about our products or want to learn more? We'd love to hear from you.
            </p>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m22 6-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>Drop us a line anytime</p>
              <a href="mailto:info@navamay.com" className="contact-link">
                info@navamay.com
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Business Hours</h3>
              <p>Available to assist you</p>
              <p className="contact-hours">Mon - Fri: 9AM - 6PM</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Location</h3>
              <p>Building the future</p>
              <p className="contact-location">India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
