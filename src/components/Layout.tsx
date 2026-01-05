import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

type Theme = 'light' | 'dark'

export const Layout = () => {
  const [theme, setTheme] = useState<Theme>('light')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

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
              {isSidebarCollapsed ? '☰' : '✕'}
            </button>
          </div>
          {!isSidebarCollapsed && <p className="sidebar-subtitle">Manage customers and deals</p>}
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/"
            className={isActive('/') ? 'nav-item nav-item-active' : 'nav-item'}
            title="Dashboard"
          >
            <span className="nav-icon"><i className="fa-solid fa-house"></i></span>
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </Link>
          <Link
            to="/builder"
            className={isActive('/builder') ? 'nav-item nav-item-active' : 'nav-item'}
            title="AI Builder"
          >
            <span className="nav-icon"><i className="fa-solid fa-brain"></i></span>
            {!isSidebarCollapsed && <span>AI Builder</span>}
          </Link>
          <Link
            to="/contacts"
            className={isActive('/contacts') ? 'nav-item nav-item-active' : 'nav-item'}
            title="Contacts"
          >
            <span className="nav-icon"><i className="fa-solid fa-user"></i></span>
            {!isSidebarCollapsed && <span>Contacts</span>}
          </Link>
          <Link
            to="/analytics"
            className={isActive('/analytics') ? 'nav-item nav-item-active' : 'nav-item'}
            title="Analytics"
          >
            <span className="nav-icon"><i className="fa-solid fa-chart-column"></i>
</span>
            {!isSidebarCollapsed && <span>Analytics</span>}
          </Link>
          <Link
            to="/roles"
            className={isActive('/roles') ? 'nav-item nav-item-active' : 'nav-item'}
            title="Roles & Permissions"
          >
            <span className="nav-icon"><i className="fa-solid fa-user-shield"></i></span>
            {!isSidebarCollapsed && <span>Roles & Permissions</span>}
          </Link>
          <Link
            to="/settings"
            className={isActive('/settings') ? 'nav-item nav-item-active' : 'nav-item'}
            title="Settings"
          >
            <span className="nav-icon"><i className="fa-solid fa-gear"></i>
</span>
            {!isSidebarCollapsed && <span>Settings</span>}
          </Link>
        </nav>

        <div className="sidebar-footer">
          {/* Footer content if needed */}
        </div>
      </aside>

      <div className="main-content">
        <Header theme={theme} setTheme={setTheme} />
        <main className="page-container">
          <Outlet context={{ theme, setTheme }} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
