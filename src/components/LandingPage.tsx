import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Field } from './ui/field'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you might send this data to a backend or save it in local storage
    // for the signup process. For now, we just redirect.
    console.log('Landing form submitted:', { name, email })
    navigate('/login')
  }

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-brand">Strollup</div>
        <nav className="landing-nav">
          <Link to="/login">
            <button className="btn btn-secondary">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-primary">Sign Up</button>
          </Link>
        </nav>
      </header>

      <main className="landing-hero">
        <div className="hero-content">
          <h1 className="landing-title">
            Build Your Travel Agency's<br />
            AI-Powered Website
          </h1>
          <p className="landing-subtitle">
            The #1 AI website builder for professional travel companies.
            Create stunning, high-converting booking platforms in minutes, not months.
          </p>
        </div>

        <div className="landing-form-container">
          <div className="landing-form-header">
            <h2 className="landing-form-title">Start Building Today</h2>
            <p className="landing-form-desc">
              Get early access to our AI travel website generator.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="landing-form">
            <div className="form-field">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                placeholder="John" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-field">
              <label className="form-label">Last Name</label>
              <input 
                type="text" 
                placeholder="Doe" 
                required
                className="form-input"
              />
            </div>

            

            <div className="form-field">
              <label className="form-label">Agency Name</label>
              <input 
                type="text" 
                placeholder="Global Travels Inc." 
                required
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Business Type</label>
              <select required className="form-select">
                <option value="" disabled selected>Select agency type</option>
                <option value="luxury">Luxury Travel</option>
                <option value="corporate">Corporate Travel</option>
                <option value="adventure">Adventure / Tours</option>
                <option value="ota">Online Travel Agent</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit" className="form-submit-btn">
              Create My AI Website
            </button>
            
            <p className="form-footer">
              🎉 Free 14-day trial · No credit card required
            </p>
          </form>
        </div>
      </main>

      <section className="features-section">
        <div className="feature-card">
          <h3 className="feature-title">AI Itinerary Builder</h3>
          <p className="feature-desc">
            Automatically generate day-by-day itineraries based on traveler preferences using our travel-tuned AI.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Smart Booking Engine</h3>
          <p className="feature-desc">
            Integrated booking system for flights, hotels, and tours tailored for travel professionals.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Dynamic Content</h3>
          <p className="feature-desc">
            Your website updates automatically with trending destinations and seasonal packages.
          </p>
        </div>
      </section>
    </div>
  )
}
