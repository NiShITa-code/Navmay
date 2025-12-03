import './About.css'

const About = () => {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Innovation First',
      description: 'Cutting-edge technology solutions that transform healthcare delivery'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 14v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Patient Centered',
      description: 'Putting patients and healthcare providers at the heart of everything we build'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and reliability you can trust'
    }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-header">
          <span className="section-badge">About Us</span>
          <h2 className="section-title">Transforming Healthcare Delivery</h2>
          <p className="section-subtitle">
            At Navamay, we're committed to bridging the gap between patients and healthcare
            providers through innovative technology solutions.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mission-statement">
          <div className="mission-content">
            <h3>Our Mission</h3>
            <p>
              To make quality healthcare accessible, efficient, and user-friendly for everyone
              through innovative technology solutions that empower both patients and healthcare
              providers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
