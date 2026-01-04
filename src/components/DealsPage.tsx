import type React from 'react'

const DealsPage: React.FC = () => {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Deals</h1>
          <p className="page-description">
            Log opportunities and track their progress through your pipeline.
          </p>
        </div>
      </header>

      <div className="card">
        <h2 className="card-title">New deal</h2>
        <form
          className="form-grid"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <div className="form-field">
            <label htmlFor="deal-name">Deal name</label>
            <input
              id="deal-name"
              type="text"
              placeholder="Website redesign for Acme"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="deal-amount">Amount</label>
            <input
              id="deal-amount"
              type="number"
              min={0}
              step={100}
              placeholder="15000"
            />
          </div>

          <div className="form-field">
            <label htmlFor="deal-stage">Stage</label>
            <select id="deal-stage" defaultValue="qualified">
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="deal-close-date">Expected close date</label>
            <input id="deal-close-date" type="date" />
          </div>

          <div className="form-field">
            <label htmlFor="deal-owner">Owner</label>
            <input
              id="deal-owner"
              type="text"
              placeholder="Assigned teammate"
            />
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="deal-notes">Notes</label>
            <textarea
              id="deal-notes"
              rows={3}
              placeholder="What problem are you solving? Timeline? Key blockers?"
            />
          </div>

          <div className="form-actions form-field-full">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save deal (UI only)
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default DealsPage
