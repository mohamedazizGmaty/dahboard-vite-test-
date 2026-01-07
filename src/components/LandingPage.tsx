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
        <h1 className="landing-title">
          Manage Your Business<br />
          With Strollup
        </h1>
        <p className="landing-subtitle">
          The all-in-one CRM platform designed for growth. 
          Streamline your operations, boost productivity, and drive results.
        </p>

        <div className="landing-form-container">
          <div className="landing-form-header">
            <h2 className="landing-form-title">Start Your Free Trial</h2>
            <p className="landing-form-desc">
              Join thousands of businesses growing with Strollup.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name">
                <Input 
                  type="text" 
                  placeholder="John" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>
              <Field label="Last Name">
                <Input 
                  type="text" 
                  placeholder="Doe" 
                  required
                />
              </Field>
            </div>

            <Field label="Work Email">
              <Input 
                type="email" 
                placeholder="john@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>

            <Field label="Company Name">
              <Input 
                type="text" 
                placeholder="Acme Inc." 
                required
              />
            </Field>

            <Field label="Job Role">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="" disabled selected>Select your role</option>
                    <option value="founder">Founder / CEO</option>
                    <option value="sales">Sales Manager</option>
                    <option value="marketing">Marketing Manager</option>
                    <option value="other">Other</option>
                </select>
            </Field>

            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1.5rem' }}>
              Get Started with Strollup
            </button>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              By clicking "Get Started", you agree to our Terms of Service. No credit card required.
            </p>
          </form>
        </div>
      </main>

      <section className="features-section">
        <div className="feature-card">
          <h3 className="feature-title">Analytics First</h3>
          <p className="feature-desc">
            Gain deep insights into your business performance with our advanced analytics dashboard.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Role Management</h3>
          <p className="feature-desc">
            Granular access control tailored to your organization structure.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Website Builder</h3>
          <p className="feature-desc">
            Create stunning landing pages within minutes using our built-in builder.
          </p>
        </div>
      </section>
    </div>
  )
}
