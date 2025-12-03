import './Products.css'

const Products = ({ onOpenWaitlist }) => {
  return (
    <section id="products" className="products">
      <div className="container">
        <div className="products-header">
          <span className="section-badge">Our Products</span>
          <h2 className="section-title">Innovative Healthcare Solutions</h2>
          <p className="section-subtitle">
            Discover our suite of cutting-edge products designed to revolutionize healthcare delivery
          </p>
        </div>

        <div className="products-grid">
          <div className="product-card">
            <div className="product-status">
              <span className="status-badge coming-soon">Coming Soon</span>
            </div>

            <div className="product-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="10" r="1" fill="currentColor" />
                <circle cx="12" cy="10" r="1" fill="currentColor" />
                <circle cx="15" cy="10" r="1" fill="currentColor" />
              </svg>
            </div>

            <h3 className="product-name">CliniqBot</h3>

            <p className="product-tagline">
              Healthcare Assistant
            </p>

            <p className="product-description">
              Seamlessly book doctor appointments through WhatsApp with our intelligent bot.
              Features an integrated dashboard for healthcare providers to manage their practice efficiently.
            </p>

            <ul className="product-features">
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                WhatsApp Integration
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Smart Scheduling
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Doctor Dashboard
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Real-time Notifications
              </li>
            </ul>

            <button className="product-button" onClick={onOpenWaitlist}>
              Join Waitlist
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="products-footer">
          <p>More innovative products coming soon...</p>
        </div>
      </div>
    </section>
  )
}

export default Products
