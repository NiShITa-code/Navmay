import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Navamay</h3>
            <p>Building the future of healthcare technology</p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a onClick={() => {
                  const el = document.getElementById('about')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}>About</a></li>
                <li><a onClick={() => {
                  const el = document.getElementById('products')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}>Products</a></li>
                <li><a onClick={() => {
                  const el = document.getElementById('contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}>Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Products</h4>
              <ul>
                <li><a onClick={() => {
                  const el = document.getElementById('products')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}>CliniqBot</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Connect</h4>
              <ul>
                <li><a href="mailto:info@navamay.com">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Navamay. All rights reserved.</p>
          <p className="footer-tagline">Innovating Healthcare Through Technology</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
