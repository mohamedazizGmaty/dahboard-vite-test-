import { useState, useRef } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import * as XLSX from 'xlsx'

// Mock Data
const salesData = [
  { name: 'Jan', sales: 4000, leads: 2400 },
  { name: 'Feb', sales: 3000, leads: 1398 },
  { name: 'Mar', sales: 2000, leads: 9800 },
  { name: 'Apr', sales: 2780, leads: 3908 },
  { name: 'May', sales: 1890, leads: 4800 },
  { name: 'Jun', sales: 2390, leads: 3800 },
]

const sourceData = [
  { name: 'Website', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Social', value: 300 },
  { name: 'Email', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AnalyticsPage() {
  const [tableData, setTableData] = useState([
    { id: 1, product: 'Consulting', revenue: 5000, date: '2023-01-15' },
    { id: 2, product: 'Implementation', revenue: 12000, date: '2023-02-20' },
    { id: 3, product: 'Training', revenue: 3000, date: '2023-03-10' },
    { id: 4, product: 'Consulting', revenue: 4500, date: '2023-03-15' },
    { id: 5, product: 'Audit', revenue: 2000, date: '2023-03-20' },
    { id: 6, product: 'Implementation', revenue: 11000, date: '2023-04-05' },
    { id: 7, product: 'Training', revenue: 3200, date: '2023-04-10' },
    { id: 8, product: 'Consulting', revenue: 5100, date: '2023-04-15' },
    { id: 9, product: 'Audit', revenue: 2100, date: '2023-04-22' },
    { id: 10, product: 'Implementation', revenue: 12500, date: '2023-05-01' },
    { id: 11, product: 'Training', revenue: 3100, date: '2023-05-10' },
    { id: 12, product: 'Consulting', revenue: 5300, date: '2023-05-15' },
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10
  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE)
  const currentData = tableData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(tableData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Report")
    XLSX.writeFile(wb, "business_report.xlsx")
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (evt) => {
      const bstr = evt.target?.result
      const wb = XLSX.read(bstr, { type: 'binary' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws)
      
      setTableData(prev => {
        const maxId = prev.length > 0 ? Math.max(...prev.map(row => row.id)) : 0;
        
        // Map imported data to match table structure
        const formattedData = data.map((row: any, index) => ({
          id: maxId + 1 + index, // Auto-increment ID
          product: row.product || row.Product || row['Product/Service'] || 'Unknown',
          revenue: Number(row.revenue || row.Revenue || 0),
          date: row.date || row.Date || new Date().toISOString().split('T')[0]
        }))

        return [...prev, ...formattedData]
      })
    }
    reader.readAsBinaryString(file)
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Analytics & Reports</h1>
          <p className="page-description">
            Visualize business performance and manage data
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
            📤 Import Excel
          </button>
          <input 
            type="file" 
            hidden 
            ref={fileInputRef} 
            accept=".xlsx, .xls" 
            onChange={handleImport}
          />
          <button className="btn-primary" onClick={handleExport}>
            📥 Export Report
          </button>
        </div>
      </header>

      <div className="analytics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Sales Chart */}
        <div className="card" style={{ height: '400px' }}>
          <h3>Revenue & Leads</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
              <Bar dataKey="leads" fill="#82ca9d" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sources Pie Chart */}
        <div className="card" style={{ height: '400px' }}>
          <h3>Lead Sources</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

      <div className="card">
        <h3>Recent Transactions Data</h3>
        <div className="table-container">
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>ID</th>
                <th style={{ padding: '1rem' }}>Product/Service</th>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>#{row.id}</td>
                  <td style={{ padding: '1rem' }}>{row.product}</td>
                  <td style={{ padding: '1rem' }}>{row.date}</td>
                  <td style={{ padding: '1rem' }}>${row.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', padding: '0 0.5rem' }}>
          <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, tableData.length)} of {tableData.length} entries
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              ⬅️ Previous
            </button>
            <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', opacity: (currentPage === totalPages || totalPages === 0) ? 0.5 : 1 }}
            >
              Next ➡️
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
