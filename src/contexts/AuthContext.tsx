import { createContext, useContext, useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

type AuthContextType = {
  session: Session | null
  user: User | null
  permissions: string[]
  loading: boolean
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (!session) setLoading(false)
    })

    // 2. Listen for changes (sign in, sign out, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (!session) {
        setPermissions([])
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fetch permissions whenever user changes
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user) return

      // Keep loading true while fetching permissions
      setLoading(true)

      try {
        // 1. Get user's roles from profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('roles')
          .eq('id', user.id)
          .single()

        const userRoles = profile?.roles || []
        
        // If no roles assigned, user has no permissions
        if (!userRoles.length) {
            setPermissions([])
            return
        }

        // 2. Get definitions for those roles
        const { data: roleDefs } = await supabase
          .from('roles_definitions')
          .select('permissions')
          .in('name', userRoles)

        if (roleDefs) {
          const allPermissions = new Set<string>()
          roleDefs.forEach((def: any) => {
            const perms = def.permissions || {}
            Object.entries(perms).forEach(([key, value]) => {
              if (value === true) {
                allPermissions.add(key)
              }
            })
          })
          setPermissions(Array.from(allPermissions))
        }
      } catch (error) {
        console.error('Error fetching permissions:', error)
        setPermissions([])
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchPermissions()
    }
  }, [user])

  const signOut = async () => {
    await supabase.auth.signOut()
    setPermissions([])
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  const value = {
    session,
    user,
    permissions,
    loading,
    signOut,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
