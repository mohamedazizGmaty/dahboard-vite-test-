import React, { useEffect, useState } from 'react'
import ChatWidget from './ChatWidget'
import { supabase } from '../lib/supabaseClient'

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeDeals: 0,
    newLeads: 0
  })
  const [recentCustomers, setRecentCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // 1. Fetch Total Revenue from Transactions
        const { data: transactions, error: transError } = await supabase
          .from('Transactions')
          .select('Revenue')
        
        let totalRevenue = 0
        if (transactions) {
          totalRevenue = transactions.reduce((sum, t) => sum + (t.Revenue || 0), 0)
        }

        // 2. Fetch Contacts for Stats and Recent List
        const { data: contacts, error: contactsError } = await supabase
          .from('contacts')
          .select('*')
          .order('id', { ascending: false })
        
        let activeDeals = 0
        let newLeads = 0
        let recentList: any[] = []

        if (contacts) {
          // Calculate stats based on status
          activeDeals = contacts.filter(c => c.status === 'Active' || c.status === 'Negotiation').length
          newLeads = contacts.filter(c => c.status === 'New' || c.status === 'Lead').length
          
          // Get top 5 for recent list
          recentList = contacts.slice(0, 5)
        }

        setStats({ totalRevenue, activeDeals, newLeads })
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
          <p className="card-label">Active Deals</p>
          <p className="card-value" style={{ color: '#3b82f6' }}>{stats.activeDeals}</p>
          <p className="card-helper">Contacts in Active/Negotiation</p>
        </div>
        <div className="card">
          <p className="card-label">New Leads</p>
          <p className="card-value" style={{ color: '#8b5cf6' }}>{stats.newLeads}</p>
          <p className="card-helper">Contacts marked New/Lead</p>
        </div>
      </div>

      <div className="grid grid-2 page-section" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Recent Customers Table */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="card-title">Recent Contacts</h2>
            <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>View All</button>
          </div>
          <div className="table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#9ca3af', fontSize: '0.9rem' }}>
                  <th style={{ padding: '0.75rem' }}>Name</th>
                  <th style={{ padding: '0.75rem' }}>Company</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3} style={{ padding: '1rem', textAlign: 'center' }}>Loading...</td></tr>
                ) : recentCustomers.length === 0 ? (
                  <tr><td colSpan={3} style={{ padding: '1rem', textAlign: 'center' }}>No contacts found</td></tr>
                ) : (
                  recentCustomers.map((customer) => (
                    <tr key={customer.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: '500' }}>{customer.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{customer.email}</div>
                      </td>
                      <td style={{ padding: '0.75rem', color: '#9ca3af' }}>{customer.company || '-'}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '12px', 
                          fontSize: '0.75rem',
                          background: customer.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 
                                      customer.status === 'Closed Won' ? 'rgba(59, 130, 246, 0.2)' : 
                                      'rgba(255, 255, 255, 0.1)',
                          color: customer.status === 'Active' ? '#34d399' : 
                                 customer.status === 'Closed Won' ? '#60a5fa' : 
                                 '#e5e7eb'
                        }}>
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

        {/* Quick Actions / Activity */}
        <div className="card">
          <h2 className="card-title">Recent Activity</h2>
          <ul className="activity-list">
            <li>
              <span style={{ marginRight: '0.5rem' }}>📧</span>
              <span>Email sent to <span className="highlight">TechFlow</span></span>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '1.5rem' }}>2 hours ago</div>
            </li>
            <li>
              <span style={{ marginRight: '0.5rem' }}>💰</span>
              <span>Deal closed with <span className="highlight">David Brown</span></span>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '1.5rem' }}>5 hours ago</div>
            </li>
            <li>
              <span style={{ marginRight: '0.5rem' }}>📞</span>
              <span>Call scheduled with <span className="highlight">Eva Green</span></span>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '1.5rem' }}>Yesterday</div>
            </li>
            <li>
              <span style={{ marginRight: '0.5rem' }}>🤖</span>
              <span>AI generated report for <span className="highlight">Q1 Sales</span></span>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '1.5rem' }}>Yesterday</div>
            </li>
          </ul>
        </div>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </section>
  )
}

export default DashboardPage
