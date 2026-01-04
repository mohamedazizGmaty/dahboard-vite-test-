import type React from 'react'

const CompaniesPage: React.FC = () => {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Companies</h1>
          <p className="page-description">
            Keep track of the organizations you work with.
          </p>
        </div>
      </header>

      <div className="card">
        <h2 className="card-title">Add company</h2>
        <form
          className="form-grid"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <div className="form-field">
            <label htmlFor="company-name">Company name</label>
            <input
              id="company-name"
              type="text"
              placeholder="Acme Inc."
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="company-industry">Industry</label>
            <input
              id="company-industry"
              type="text"
              placeholder="Software, Healthcare, Retail..."
            />
          </div>

          <div className="form-field">
            <label htmlFor="company-size">Company size</label>
            <select id="company-size" defaultValue="1-10">
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-250">51-250</option>
              <option value="250+">250+</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="company-website">Website</label>
            <input
              id="company-website"
              type="url"
              placeholder="https://example.com"
            />
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="company-notes">Notes</label>
            <textarea
              id="company-notes"
              rows={3}
              placeholder="Key products, decision makers, context..."
            />
          </div>

          <div className="form-actions form-field-full">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save company (UI only)
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CompaniesPage
