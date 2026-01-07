import type React from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type Theme = 'light' | 'dark'

type ContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useOutletContext<ContextType>()
  const { session } = useAuth()

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Settings</h1>
          <p className="page-description">
            Configure your workspace. This is just the design layer.
          </p>
        </div>
      </header>

      <div className="grid grid-2 page-section">
        <div className="card">
          <h2 className="card-title">Profile</h2>
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <div className="form-field form-field-full">
              <label htmlFor="user-name">Your name</label>
              <input id="user-name" type="text" placeholder="Your name" />
            </div>

            <div className="form-field form-field-full">
              <label htmlFor="user-email">Email</label>
              <input id="user-email" type="email" placeholder="you@example.com" />
            </div>

            <div className="form-actions form-field-full">
              <button type="submit" className="btn btn-primary">
                Save profile (UI only)
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <h2 className="card-title">Preferences</h2>
          <form
            className="form-list"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>Email me a daily summary</span>
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={(event) => setTheme(event.target.checked ? 'dark' : 'light')}
              />
              <span>Enable dark mode</span>
            </label>
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>Show onboarding tips</span>
            </label>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save preferences (UI only)
              </button>
            </div>
          </form>
        </div>

    
      </div>
    </section>
  )
}

export default SettingsPage
