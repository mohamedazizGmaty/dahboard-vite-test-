import React, { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

// Types
type Theme = 'light' | 'dark'

type AlertChannel = {
  email: boolean
  // Future: slack: boolean
}

type Budget = {
  id: string
  name: string
  type: 'ai_usage' | 'customer_budget'
  period: 'daily' | 'weekly' | 'monthly'
  limit: number // currency for customer budgets, tokens/$ for AI; UI-only for now
  usage: number // current usage in same unit as limit
  thresholdPct: number // when usage/limit >= thresholdPct -> alert
  channels: AlertChannel
  recipients: string // comma separated emails; UI-only for now
}

function pct(n: number) {
  return Math.round(n * 100)
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

const mockBudgets: Budget[] = [
  {
    id: 'b1',
    name: 'AI Usage (Gemini) - Monthly',
    type: 'ai_usage',
    period: 'monthly',
    limit: 1000000, 
    usage: 420000,
    thresholdPct: 70,
    channels: { email: true },
    recipients: 'alerts@example.com',
  },
  {
    id: 'b2',
    name: 'Enterprise Customer Budget - Q1',
    type: 'customer_budget',
    period: 'monthly',
    limit: 50000,
    usage: 32000,
    thresholdPct: 80,
    channels: { email: true },
    recipients: 'finance@example.com,ops@example.com',
  },
  {
    id: 'b3',
    name: 'Marketing Campaign Ads',
    type: 'customer_budget',
    period: 'weekly',
    limit: 2000,
    usage: 2150,
    thresholdPct: 90,
    channels: { email: true },
    recipients: 'marketing@example.com',
  },
  {
    id: 'b4',
    name: 'Dev Team API Tokens',
    type: 'ai_usage',
    period: 'monthly',
    limit: 5000000,
    usage: 3400000,
    thresholdPct: 75,
    channels: { email: false },
    recipients: 'dev@example.com',
  }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']
const STATUS_COLORS = { ok: '#10b981', warn: '#f59e0b', alert: '#ef4444' }

export default function AlertsPage() {
  const { theme } = useOutletContext<{ theme: Theme; setTheme: (t: Theme) => void }>()
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets)
  const [pendingSaves, setPendingSaves] = useState(false)
  const [lastRunAt, setLastRunAt] = useState<Date | null>(null)

  const rows = useMemo(() => {
    return budgets.map((b) => {
      const ratio = b.limit > 0 ? b.usage / b.limit : 0
      const percent = Math.round(ratio * 100)
      let status: 'ok' | 'warn' | 'alert' = 'ok'
      if (percent >= b.thresholdPct && percent < 100) status = 'warn'
      if (percent >= 100) status = 'alert'
      return { ...b, ratio, percent, status }
    })
  }, [budgets])

  const triggered = rows.filter((r) => r.percent >= r.thresholdPct)

  // KPI Data
  const kpiData = useMemo(() => {
    const totalBudgets = rows.length
    const triggeredCount = triggered.length
    const avgUsage = rows.length > 0 ? rows.reduce((acc, r) => acc + r.percent, 0) / rows.length : 0
    return { totalBudgets, triggeredCount, avgUsage }
  }, [rows, triggered])

  // Chart Data
  const chartData = useMemo(() => {
    // 1. Budget Usage vs Limit (Bar Chart)
    const usageData = rows.map(r => ({
      name: r.name.length > 15 ? r.name.substring(0, 15) + '...' : r.name,
      usage: r.usage,
      limit: r.limit,
      full_name: r.name
    }))

    // 2. Status Distribution (Pie Chart)
    const statusCounts: Record<string, number> = { ok: 0, warn: 0, alert: 0 }
    rows.forEach(r => { statusCounts[r.status]++ })
    const statusData = [
      { name: 'Normal', value: statusCounts.ok, color: STATUS_COLORS.ok },
      { name: 'Warning', value: statusCounts.warn, color: STATUS_COLORS.warn },
      { name: 'Critical', value: statusCounts.alert, color: STATUS_COLORS.alert },
    ].filter(d => d.value > 0)

    return { usageData, statusData }
  }, [rows])

  const handleUpdate = (id: string, patch: Partial<Budget>) => {
    setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)))
    setPendingSaves(true)
  }

  const handleSave = async () => {
    // TODO: Persist budgets to Supabase tables
    await new Promise((r) => setTimeout(r, 600))
    setPendingSaves(false)
  }

  const runCheck = async () => {
    // TODO: Check budgets
    setLastRunAt(new Date())
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Alerts & Budgets</h1>
          <p className="page-description">
            Monitor resource usage, configure thresholds, and manage notifications.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary" onClick={runCheck}>Run Check Now</button>
          <button className="btn-primary" onClick={handleSave} disabled={!pendingSaves}>
            {pendingSaves ? 'Save Changes' : 'Saved'}
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Total Budgets Tracked</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
            {kpiData.totalBudgets}
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Active Alerts</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: kpiData.triggeredCount > 0 ? '#ef4444' : '#10b981' }}>
            {kpiData.triggeredCount}
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Avg. Budget Utilization</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
            {kpiData.avgUsage.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="analytics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Usage Comparison Chart */}
        <div className="card" style={{ height: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem' }}>Budget Usage vs Limits</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData.usageData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e7eb' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  formatter={(value: number) => [value.toLocaleString(), '']}
                />
                <Legend />
                <Bar dataKey="usage" fill="#8884d8" name="Usage" radius={[4, 4, 0, 0]} />
                <Bar dataKey="limit" fill="#82ca9d" name="Limit" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="card" style={{ height: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem' }}>Alert Status Distribution</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                   itemStyle={{ color: '#e5e7eb' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Triggered Alerts List */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span> 
          Active Alerts
        </h2>
        {triggered.length === 0 ? (
          <div style={{ color: '#9ca3af', padding: '1rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            No active alerts. All budgets are within limits.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
             {triggered.map(t => (
               <div key={t.id} style={{ 
                 padding: '1rem', 
                 borderRadius: '8px', 
                 background: 'rgba(239, 68, 68, 0.1)', 
                 border: '1px solid rgba(239, 68, 68, 0.2)',
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center'
               }}>
                 <div>
                   <h4 style={{ margin: 0, color: '#fca5a5' }}>{t.name}</h4>
                   <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#fee2e2' }}>
                     Current usage is <strong>{t.percent}%</strong> of limit. Threshold is {t.thresholdPct}%.
                   </p>
                 </div>
                 <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#fca5a5' }}>
                   {t.channels.email ? `Sent to: ${t.recipients}` : 'Notifications disabled'}
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="card-title">Budget Configuration</h3>
        <div className="table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Type & Period</th>
                <th style={{ padding: '1rem' }}>Usage / Limit</th>
                <th style={{ padding: '1rem' }}>Utilization</th>
                <th style={{ padding: '1rem' }}>Alert Threshold</th>
                <th style={{ padding: '1rem' }}>Recipients</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{r.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ textTransform: 'capitalize' }}>{r.type.replace('_', ' ')}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{r.period}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div>{r.usage.toLocaleString()}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>of {r.limit.toLocaleString()}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, minWidth: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${Math.min(r.percent, 100)}%`, 
                          height: '100%', 
                          background: STATUS_COLORS[r.status]
                        }} />
                      </div>
                      <span style={{ color: STATUS_COLORS[r.status], fontWeight: 'bold' }}>{r.percent}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={r.thresholdPct}
                        onChange={(e) => handleUpdate(r.id, { thresholdPct: parseInt(e.target.value) })}
                        style={{ accentColor: '#8b5cf6' }}
                      />
                      <span>{r.thresholdPct}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={r.channels.email}
                          onChange={(e) => handleUpdate(r.id, { channels: { ...r.channels, email: e.target.checked } })}
                          style={{ accentColor: '#3b82f6' }}
                        />
                         Email Alerts
                      </label>
                      {r.channels.email && (
                        <input
                          type="text"
                          value={r.recipients}
                          onChange={(e) => handleUpdate(r.id, { recipients: e.target.value })}
                          placeholder="email@example.com"
                          style={{ 
                            background: 'rgba(0,0,0,0.2)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '4px',
                            padding: '0.25rem 0.5rem',
                            color: 'inherit',
                            width: '100%'
                          }}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
