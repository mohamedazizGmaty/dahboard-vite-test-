import React, { useEffect, useState } from 'react'
import ChatWidget from './ChatWidget'
import { supabase } from '../lib/supabaseClient'

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTransactions: 0,
    totalContacts: 0
  })
  const [recentCustomers, setRecentCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // 1. Fetch Total Revenue and Count from Transactions
        const { data: transactions, error: transError } = await supabase
          .from('Transactions')
          .select('Revenue')
        
        let totalRevenue = 0
        let totalTransactions = 0
        if (transactions) {
          totalRevenue = transactions.reduce((sum, t) => sum + (t.Revenue || 0), 0)
          totalTransactions = transactions.length
        }

        // 2. Fetch Contacts for Stats and Recent List
        const { data: contacts, error: contactsError } = await supabase
          .from('contacts')
          .select('*')
          .order('id', { ascending: false })
        
        let totalContacts = 0
        let recentList: any[] = []

        if (contacts) {
          totalContacts = contacts.length
          // Get top 5 for recent list
          recentList = contacts.slice(0, 5)
        }

        setStats({ totalRevenue, totalTransactions, totalContacts })
        setRecentCustomers(recentList)
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p className="page-description">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
      </header>

   

      {/* Stats Grid */}
      <div className="grid grid-3">
        <div className="card">
          <p className="card-label">Total Revenue (All Time)</p>
          <p className="card-value" style={{ color: '#10b981' }}>
            ${stats.totalRevenue.toLocaleString()}
          </p>
          <p className="card-helper">Based on Transactions</p>
        </div>
        <div className="card">
          <p className="card-label">Total Transactions</p>
          <p className="card-value" style={{ color: '#3b82f6' }}>{stats.totalTransactions}</p>
          <p className="card-helper">Recorded in Analytics</p>
        </div>
        <div className="card">
          <p className="card-label">Total Contacts</p>
          <p className="card-value" style={{ color: '#8b5cf6' }}>{stats.totalContacts}</p>
          <p className="card-helper">All saved contacts</p>
        </div>
      </div>

      <div className="grid grid-2 page-section" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Recent Customers Table */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="card-title">Recent Contacts</h2>
            <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>View All</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center' }}>Loading...</td></tr>
                ) : recentCustomers.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center' }}>No contacts found</td></tr>
                ) : (
                  recentCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div style={{ fontWeight: '500' }}>{customer.name}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{customer.email}</div>
                      </td>
                      <td style={{ opacity: 0.7 }}>{customer.company || '-'}</td>
                      <td>
                        <span className={`status-badge status-${(customer.status || 'inactive').toLowerCase().replace(' ', '-')}`}>
                          {customer.status || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

            {/* Alerts Summary */}
        <div className="card">
          <p className="card-label">Alerts</p>
          <p className="card-helper">Budget thresholds preview (UI sample)</p>
          <ul className="activity-list" style={{ marginTop: '0.5rem' }}>
            <li>
              <span style={{ marginRight: '0.5rem' }}>⚠��</span>
              AI Usage (Gemini) - Monthly approaching threshold
            </li>
            <li>
              <span style={{ marginRight: '0.5rem' }}>⚠️</span>
              Enterprise Customer Budget - Q1 at 64%
            </li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
            <a href="/alerts" className="btn btn-secondary">View Alerts</a>
          </div>
        </div>
    
        </div>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </section>
  )
}

export default DashboardPage
