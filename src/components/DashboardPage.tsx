import type React from 'react'

const DashboardPage: React.FC = () => {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Overview</h1>
          <p className="page-description">
            High-level snapshot of your sales pipeline and recent activity.
          </p>
        </div>
      </header>

      <div className="grid grid-3">
        <div className="card">
          <p className="card-label">Active Contacts</p>
          <p className="card-value">128</p>
          <p className="card-helper">People you are currently engaging with.</p>
        </div>
        <div className="card">
          <p className="card-label">Open Deals</p>
          <p className="card-value">23</p>
          <p className="card-helper">Opportunities still in the pipeline.</p>
        </div>
        <div className="card">
          <p className="card-label">Expected Revenue</p>
          <p className="card-value">$42,500</p>
          <p className="card-helper">Based on deals in active stages.</p>
        </div>
      </div>

      <div className="grid grid-2 page-section">
        <div className="card">
          <h2 className="card-title">Recent activity</h2>
          <ul className="activity-list">
            <li>
              Followed up with <span className="highlight">Sarah Chen</span> about Q1 renewal.
            </li>
            <li>
              Logged a new deal for <span className="highlight">Acme Corp</span>.
            </li>
            <li>
              Updated contact details for <span className="highlight">John Smith</span>.
            </li>
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">Getting started</h2>
          <ol className="getting-started-list">
            <li>1. Add your first contact.</li>
            <li>2. Create a company and assign contacts.</li>
            <li>3. Log deals to track potential revenue.</li>
            <li>4. Later, connect this UI to Supabase.</li>
          </ol>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
