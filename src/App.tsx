import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import DashboardPage from './components/DashboardPage'
import ContactsPage from './components/ContactsPage'
import CompaniesPage from './components/CompaniesPage'
import DealsPage from './components/DealsPage'
import SettingsPage from './components/SettingsPage'
import WebsiteBuilderPage from './components/WebsiteBuilderPage'

type Page = 'dashboard' | 'contacts' | 'companies' | 'deals' | 'settings' | 'builder'
type Theme = 'light' | 'dark'

function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard')
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <div className={`app-shell theme-${theme}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">Company CRM</div>
          <p className="sidebar-subtitle">Manage customers and deals</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={
              activePage === 'dashboard' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('dashboard')}
          >
            <span className="nav-icon">🏠</span>
            <span>Dashboard</span>
          </button>
          <button
            className={
              activePage === 'builder' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('builder')}
          >
            <span className="nav-icon">✨</span>
            <span>AI Builder</span>
          </button>
          <button
            className={
              activePage === 'contacts' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('contacts')}
          >
            <span className="nav-icon">👤</span>
            <span>Contacts</span>
          </button>
          <button
            className={
              activePage === 'companies' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('companies')}
          >
            <span className="nav-icon">🏢</span>
            <span>Companies</span>
          </button>
          <button
            className={
              activePage === 'deals' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('deals')}
          >
            <span className="nav-icon">💼</span>
            <span>Deals</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            className={
              activePage === 'settings' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('settings')}
          >
            <span className="nav-icon">⚙️</span>
            <span>Settings</span>
          </button>
        </div>
      </aside>
      <div className="main-area">
        <Header
          theme={theme}
          onToggleTheme={() =>
            setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
          }
        />
        <main className="content">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'builder' && <WebsiteBuilderPage />}
          {activePage === 'contacts' && <ContactsPage />}
          {activePage === 'companies' && <CompaniesPage />}
          {activePage === 'deals' && <DealsPage />}
          {activePage === 'settings' && (
            <SettingsPage
              theme={theme}
              onToggleDarkMode={(enabled) => setTheme(enabled ? 'dark' : 'light')}
            />
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
