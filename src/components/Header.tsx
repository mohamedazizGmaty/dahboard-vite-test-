import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

type HeaderProps = {
    theme: 'light' | 'dark'
    setTheme: (theme: 'light' | 'dark') => void
}

export default function Header({ theme, setTheme }: HeaderProps) {
    const isDark = theme === 'dark'
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    
    // Prefer avatar URL from auth provider metadata if present
    const avatarUrl = (user?.user_metadata as any)?.avatar_url || (user?.user_metadata as any)?.picture || ''

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSignOut = async () => {
        await signOut()
        navigate('/login')
    }

    return (
        <header className="topbar">
            <div className="topbar-left">
                <span className="topbar-title">Strollup</span>
                <span className="topbar-subtitle">
                    Simple dashboard UI, ready for Supabase later
                </span>
            </div>
            <div className="topbar-user" ref={dropdownRef}>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    style={{ marginRight: '1rem' }}
                >
                    <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
                    <span className="sr-only">
                        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    </span>
                </button>
                
                <div className="profile-menu-container">
                    <button 
                        className="profile-trigger"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Profile" className="avatar-img" />
                        ) : (
                            <div className="avatar">{user?.email?.charAt(0).toUpperCase() || 'U'}</div>
                        )}
                    </button>

                    {isDropdownOpen && (
                        <div className="profile-dropdown">
                            <div className="profile-header-info">
                                <span className="profile-name">{user?.email || 'User'}</span>
                                <span className="profile-role">Administrator</span>
                            </div>
                            <div className="profile-divider"></div>
                            <button onClick={() => navigate('/settings')} className="profile-item">
                                Settings
                            </button>
                            <button onClick={handleSignOut} className="profile-item text-red-500">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
