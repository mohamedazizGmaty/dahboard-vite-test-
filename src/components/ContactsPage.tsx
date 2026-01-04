import type React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export type Contact = {
  id: number
  name: string
  email: string | null
  phone: string | null
  company: string | null
  status: string | null
}

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const handleDeleteContact = async (id: number) => {
    setLoading(true)
    setError(null)
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    if (error) {
      setError(error.message)
    } else {
      setContacts((prev) => prev.filter((contact) => contact.id !== id))
    }
    setLoading(false)
  }

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('contacts')
        .select('id, name, email, phone, company, status')
        .order('id', { ascending: false })

      if (error) {
        setError(error.message)
      } else if (data) {
        setContacts(data as Contact[])
      }
      setLoading(false)
    }

    loadContacts().catch((err) => {
      setError(String(err))
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('contacts')
        .select('id, name, email, phone, company, status')
        .order('id', { ascending: false })

      if (error) {
        setError(error.message)
      } else if (data) {
        setContacts(data as Contact[])
      }
      setLoading(false)
    }

    loadContacts().catch((err) => {
      setError(String(err))
      setLoading(false)
    })
  }, [])

  const filteredContacts = contacts.filter((contact) => {
    if (!search.trim()) return true
    const term = search.toLowerCase()
    return (
      contact.name.toLowerCase().includes(term) ||
      (contact.email ?? '').toLowerCase().includes(term) ||
      (contact.phone ?? '').toLowerCase().includes(term) ||
      (contact.company ?? '').toLowerCase().includes(term) ||
      (contact.status ?? '').toLowerCase().includes(term)
    )
  })

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Contacts</h1>
          <p className="page-description">
            Store people you talk to: leads, customers, and partners.
          </p>
        </div>
      </header>

      <div className="card">
        <h2 className="card-title">Add new contact (Supabase)</h2>
        {error && <p className="error-text">{error}</p>}
        <form
          className="form-grid"
          onSubmit={(event) => {
            event.preventDefault()
            const form = event.currentTarget
            const formData = new FormData(form)

            const name = String(formData.get('name') || '')
            const email = (formData.get('email') as string) || null
            const phone = (formData.get('phone') as string) || null
            const company = (formData.get('company') as string) || null
            const status = (formData.get('status') as string) || null

            if (!name) return

            setLoading(true)
            setError(null)

            supabase
              .from('contacts')
              .insert({ name, email, phone, company, status })
              .select('id, name, email, phone, company, status')
              .single()
              .then(
                ({ data, error }) => {
                  if (error) {
                    setError(error.message)
                    return
                  }

                  if (data) {
                    setContacts((prev) => [data as Contact, ...prev])
                    form.reset()
                  }
                  setLoading(false)
                },
                (err: unknown) => {
                  setError(String(err))
                  setLoading(false)
                },
              )
          }}
        >
          <div className="form-field">
            <label htmlFor="contact-name">Full name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="jane@example.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="contact-phone">Phone</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="+216 00-000-000"
            />
          </div>

          <div className="form-field">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              placeholder="Acme Inc."
            />
          </div>

          <div className="form-field">
            <label htmlFor="contact-status">Status</label>
            <select id="contact-status" name="status" defaultValue="lead">
              <option value="lead">Lead</option>
              <option value="customer">Customer</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="contact-notes">Notes</label>
            <textarea
              id="contact-notes"
              rows={3}
              placeholder="How did you meet? What do they care about?"
            />
          </div>

          <div className="form-actions form-field-full">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {loading ? 'Saving…' : 'Save contact'}
            </button>
          </div>
        </form>
      </div>

      <div className="card page-section">
        <h2 className="card-title">Contacts from Supabase</h2>
        <div className="form-field form-field-full" style={{ marginBottom: '1rem' }}>
          <label htmlFor="contact-search">Search contacts</label>
          <input
            id="contact-search"
            type="text"
            placeholder="Search by name, email, company, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading && contacts.length === 0 && <p>Loading contacts…</p>}
        {!loading && filteredContacts.length === 0 && <p>No contacts match your search.</p>}
        {filteredContacts.length > 0 && (
          <div className="grid grid-2">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="card">
                <p className="card-label">Contact</p>
                <p className="card-value">{contact.name}</p>
                {contact.email && <p className="card-helper">📧 {contact.email}</p>}
                {contact.phone && <p className="card-helper">📞 {contact.phone}</p>}
                {contact.company && <p className="card-helper">🏢 {contact.company}</p>}
                {contact.status && <p className="card-helper">Status: {contact.status}</p>}
                  <div style={{ marginTop: '0.5rem' }}> <button onClick={() => handleDeleteContact(contact.id)} className="btn btn-danger">
                 
              {loading ? 'Deleting...' : 'Delete '}
            </button></div>
                
              </div>
              
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ContactsPage
