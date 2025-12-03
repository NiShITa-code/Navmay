import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
              <path d="M32 4L8 16V28C8 42.5 16.5 54.5 32 60C47.5 54.5 56 42.5 56 28V16L32 4Z"
                    fill="url(#shield-gradient)"
                    stroke="url(#stroke-gradient)"
                    strokeWidth="2"/>
              <path d="M32 20V44M20 32H44"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"/>
              <path d="M18 38L22 38L24 34L28 42L30 38L34 38"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"/>
              <defs>
                <linearGradient id="shield-gradient" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2563eb"/>
                  <stop offset="100%" stopColor="#1e40af"/>
                </linearGradient>
                <linearGradient id="stroke-gradient" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="100%" stopColor="#1d4ed8"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="logo-text">
              <h1>Navmay</h1>
              <span className="logo-tagline">Healthcare Innovation</span>
            </div>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <a onClick={() => scrollToSection('home')}>Home</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('about')}>About</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('products')}>Products</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('contact')}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
