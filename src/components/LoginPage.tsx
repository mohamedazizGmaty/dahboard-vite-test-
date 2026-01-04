import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from '@react-login-page/page3'
import { signIn, signInWithGoogle } from '../lib/auth'
import './LoginPage.css'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Successful login, redirect to dashboard
      navigate('/')
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle()
    if (error) setError(error.message)
  }

  return (
    <Login className="login-page3">
      <Login.Welcome>Welcome back! Log in to your account.</Login.Welcome>
      
      <Login.Email 
        value={email} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
        placeholder="Email address"
      />
      <Login.Password 
        value={password} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
        placeholder="Password"
      />

      <Login.Submit onClick={handleSubmit} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </Login.Submit>

      <Login.ButtonAfter>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {error && <div style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
          
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              backgroundColor: 'white',
              color: '#333',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Sign in with Google
          </button>

          <div style={{ textAlign: 'center' }}>
            <Link to="/signup" style={{ color: '#b08bf8', textDecoration: 'none' }}>
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </Login.ButtonAfter>
    </Login>
  )
}
