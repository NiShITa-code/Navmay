import './Hero.css'

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge fade-in">
            <span>🏥 Healthcare Technology Leaders</span>
          </div>

          <h1 className="hero-title slide-up">
            Innovating Healthcare
            <br />
            <span className="gradient-text">Through Technology</span>
          </h1>

          <p className="hero-subtitle slide-up">
            Navamay builds cutting-edge healthcare products that make quality
            healthcare accessible, efficient, and user-friendly for everyone.
          </p>

          <div className="hero-buttons slide-up">
            <button className="btn btn-primary" onClick={scrollToProducts}>
              Explore Our Products
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className="btn btn-secondary" onClick={() => {
              const element = document.getElementById('about')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}>
              Learn More
            </button>
          </div>

          <div className="hero-stats slide-up">
            <div className="stat">
              <h3>100%</h3>
              <p>Healthcare Focused</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Always Available</p>
            </div>
            <div className="stat">
              <h3>AI Powered</h3>
              <p>Smart Technology</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
