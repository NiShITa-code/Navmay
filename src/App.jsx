import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WaitlistModal from './components/WaitlistModal'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Products onOpenWaitlist={openModal} />
      <Contact />
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default App
