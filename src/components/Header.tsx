type HeaderProps = {
    theme: 'light' | 'dark'
    onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
    const isDark = theme === 'dark'

    return (
        <header className="topbar">
            <div className="topbar-left">
                <span className="topbar-title">Company CRM</span>
                <span className="topbar-subtitle">
                    Simple dashboard UI, ready for Supabase later
                </span>
            </div>
            <div className="topbar-user">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onToggleTheme}
                >
                    <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
                    <span className="sr-only">
                        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    </span>
                </button>
                <div className="avatar">AZ</div>
                <div className="topbar-user-info">
                    <span className="topbar-user-name">Azeez</span>
                    <span className="topbar-user-role">Admin</span>
                </div>
            </div>
        </header>
    )
}
