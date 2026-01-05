import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import DashboardPage from './components/DashboardPage'
import ContactsPage from './components/ContactsPage'
import CompaniesPage from './components/CompaniesPage'
import DealsPage from './components/DealsPage'
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
            <Route path="/" element={<DashboardPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/builder" element={<WebsiteBuilderPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/roles" element={<RolesPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
