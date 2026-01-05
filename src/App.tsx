import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import DashboardPage from './components/DashboardPage'
import ContactsPage from './components/ContactsPage'
import SettingsPage from './components/SettingsPage'
import WebsiteBuilderPage from './components/WebsiteBuilderPage'
import AnalyticsPage from './components/AnalyticsPage'
import RolesPage from './components/RolesPage'
import { LoginPage } from './components/LoginPage'
import { SignupPage } from './components/SignupPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute requiredPermission="view_dashboard" />}>
              <Route path="/" element={<DashboardPage />} />
            </Route>

            <Route element={<ProtectedRoute requiredPermission="view_contacts" />}>
              <Route path="/contacts" element={<ContactsPage />} />
            </Route>

            <Route element={<ProtectedRoute requiredPermission="view_settings" />}>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route element={<ProtectedRoute requiredPermission="view_builder" />}>
              <Route path="/builder" element={<WebsiteBuilderPage />} />
            </Route>

            <Route element={<ProtectedRoute requiredPermission="view_analytics" />}>
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>

            <Route element={<ProtectedRoute requiredPermission="view_roles" />}>
              <Route path="/roles" element={<RolesPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
