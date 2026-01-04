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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className={`app-shell theme-${theme}`}>
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-top-row">
            {!isSidebarCollapsed && <div className="sidebar-logo">Company CRM</div>}
            <button 
              className="sidebar-toggle"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? '➡️' : '⬅️'}
            </button>
          </div>
          {!isSidebarCollapsed && <p className="sidebar-subtitle">Manage customers and deals</p>}
        </div>

        <nav className="sidebar-nav">
          <button
            className={
              activePage === 'dashboard' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('dashboard')}
            title="Dashboard"
          >
            <span className="nav-icon">🏠</span>
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </button>
          <button
            className={
              activePage === 'builder' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('builder')}
            title="AI Builder"
          >
            <span className="nav-icon">✨</span>
            {!isSidebarCollapsed && <span>AI Builder</span>}
          </button>
          <button
            className={
              activePage === 'contacts' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('contacts')}
            title="Contacts"
          >
            <span className="nav-icon">👤</span>
            {!isSidebarCollapsed && <span>Contacts</span>}
          </button>
          <button
            className={
              activePage === 'companies' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('companies')}
            title="Companies"
          >
            <span className="nav-icon">🏢</span>
            {!isSidebarCollapsed && <span>Companies</span>}
          </button>
          <button
            className={
              activePage === 'deals' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('deals')}
            title="Deals"
          >
            <span className="nav-icon">💼</span>
            {!isSidebarCollapsed && <span>Deals</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            className={
              activePage === 'settings' ? 'nav-item nav-item-active' : 'nav-item'
            }
            onClick={() => setActivePage('settings')}
            title="Settings"
          >
            <span className="nav-icon">⚙️</span>
            {!isSidebarCollapsed && <span>Settings</span>}
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
