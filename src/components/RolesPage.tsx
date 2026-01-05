import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import './RolesPage.css'

interface Permission {
  id: string
  label: string
  key: string
}

const AVAILABLE_PERMISSIONS: Permission[] = [
  { id: '1', label: 'View Dashboard', key: 'view_dashboard' },
  { id: '2', label: 'Access AI Builder', key: 'view_builder' },
  { id: '3', label: 'View Contacts', key: 'view_contacts' },
  { id: '4', label: 'View Analytics', key: 'view_analytics' },
  { id: '5', label: 'Manage Roles & Permissions', key: 'view_roles' },
  { id: '6', label: 'Access Settings', key: 'view_settings' },
]

interface Role {
  id: string
  name: string
  description: string
  permissions: Record<string, boolean>
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
  roles: string[] // Role IDs or Names
  status: 'Active' | 'Inactive'
  isActive: boolean
}

export default function RolesPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [roles, setRoles] = useState<Role[]>([])
  
  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('roles_definitions')
        .select('*')
        .order('name')
      
      if (error) throw error
      
      if (data) {
        setRoles(data)
      }
    } catch (err) {
      console.error('Error fetching roles:', err)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      // Try to fetch from 'profiles' table first (standard convention)
      let { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')

      // If 'profiles' fails, try 'users' table (another common convention)
      if (profilesError) {
        console.warn('Could not fetch from "profiles", trying "users"...', profilesError)
        const { data: publicUsers, error: usersError } = await supabase
          .from('users')
          .select('*')
        
        if (usersError) {
          throw new Error('Could not fetch users. Ensure you have a public "profiles" or "users" table with RLS policies allowing read access.')
        }
        profiles = publicUsers
      }
      
      if (!profiles || profiles.length === 0) {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (currentUser) {
           const me: User = {
            id: currentUser.id,
            name: currentUser.user_metadata?.full_name || 'Current User (Session)',
            email: currentUser.email || '',
            avatar: currentUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${currentUser.email}`,
            roles: ['Admin'], 
            status: 'Active',
            isActive: true
          }
          setUsers([me])
          setError('No other users found. Showing current session user. Ensure "profiles" table is populated.')
          return
        }
      }

      if (profiles) {
        const mappedUsers: User[] = profiles.map((p: any) => ({
          id: p.id,
          name: p.full_name || p.username || p.name || 'Unknown User',
          email: p.email || 'No email', 
          avatar: p.avatar_url || p.avatar || `https://ui-avatars.com/api/?name=${p.full_name || 'User'}`,
          roles: Array.isArray(p.roles) ? p.roles : (p.role ? [p.role] : []),
          status: p.status || 'Active',
          isActive: p.active !== false // Default to true unless explicitly false
        }))
        setUsers(mappedUsers)
      }
    } catch (err: any) {
      console.error('Error fetching users:', err)
      setError(err.message || 'Failed to load users')
      
      // Fallback to current user on error so the page isn't dead
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (currentUser) {
          const me: User = {
          id: currentUser.id,
          name: currentUser.user_metadata?.full_name || 'Current User (Session)',
          email: currentUser.email || '',
          avatar: currentUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${currentUser.email}`,
          roles: ['Admin'], 
          status: 'Active',
          isActive: true
        }
        setUsers([me])
      }
    } finally {
      setLoading(false)
    }
  }
  
  // Modal States
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  // User Management
  const toggleUserActive = async (userId: string) => {
    // Optimistic update
    const user = users.find(u => u.id === userId)
    if (!user) return
    
    const newActiveState = !user.isActive
    
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isActive: newActiveState } : u
    ))

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ active: newActiveState })
        .eq('id', userId)
      
      if (error) throw error
    } catch (err) {
      console.error('Error updating user status:', err)
      // Revert on error
      setUsers(users.map(u => 
        u.id === userId ? { ...u, isActive: !newActiveState } : u
      ))
      alert('Failed to update user status')
    }
  }

  const openUserModal = (user: User) => {
    setSelectedUser(user)
    setIsUserModalOpen(true)
  }

  const toggleUserRole = async (roleName: string) => {
    if (!selectedUser) return
    
    const currentRoles = selectedUser.roles
    const newRoles = currentRoles.includes(roleName)
      ? currentRoles.filter(r => r !== roleName)
      : [...currentRoles, roleName]
      
    // Optimistic update
    const updatedUser = { ...selectedUser, roles: newRoles }
    setSelectedUser(updatedUser)
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u))

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ roles: newRoles })
        .eq('id', selectedUser.id)
      
      if (error) throw error
    } catch (err) {
      console.error('Error updating user roles:', err)
      // Revert
      setSelectedUser(selectedUser)
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u))
      alert('Failed to update user roles')
    }
  }

  // Role Management
  const openRoleModal = (role: Role) => {
    setSelectedRole(role)
    setIsRoleModalOpen(true)
  }

  const createNewRole = async () => {
    const newRoleName = prompt('Enter name for new role:')
    if (!newRoleName) return

    const roleId = newRoleName.toLowerCase().replace(/\s+/g, '-')
    
    const newRole: Role = {
      id: roleId,
      name: newRoleName,
      description: 'New custom role',
      permissions: {
        view_dashboard: false,
        view_builder: false,
        view_contacts: false,
        view_analytics: false,
        view_roles: false,
        view_settings: false
      }
    }

    // Optimistic update
    setRoles([...roles, newRole])

    try {
      const { error } = await supabase
        .from('roles_definitions')
        .insert([newRole])
      
      if (error) throw error
    } catch (err) {
      console.error('Error creating role:', err)
      setRoles(roles.filter(r => r.id !== roleId))
      alert('Failed to create role')
    }
  }

  const toggleRolePermission = async (permissionKey: string) => {
    if (!selectedRole) return

    const updatedRole = {
      ...selectedRole,
      permissions: {
        ...selectedRole.permissions,
        [permissionKey]: !selectedRole.permissions[permissionKey]
      }
    }

    // Optimistic update
    setSelectedRole(updatedRole)
    setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r))

    try {
      const { error } = await supabase
        .from('roles_definitions')
        .update({ permissions: updatedRole.permissions })
        .eq('id', selectedRole.id)
      
      if (error) throw error
    } catch (err) {
      console.error('Error updating role permissions:', err)
      // Revert
      setSelectedRole(selectedRole)
      setRoles(roles.map(r => r.id === selectedRole.id ? selectedRole : r))
      alert('Failed to update permissions')
    }
  }

  const updateRoleName = async (name: string) => {
    if (!selectedRole) return
    const updatedRole = { ...selectedRole, name }
    
    // Optimistic update
    setSelectedRole(updatedRole)
    setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r))
  }
  
  const saveRoleName = async () => {
    if (!selectedRole) return
    try {
      const { error } = await supabase
        .from('roles_definitions')
        .update({ name: selectedRole.name })
        .eq('id', selectedRole.id)
        
      if (error) throw error
    } catch (err) {
      console.error('Error saving role name:', err)
      alert('Failed to save role name')
    }
  }

  return (
    <div className="roles-page">
      <div className="roles-header">
        <h1>User & Roles Management</h1>
        <p>Intelligent Insights & Personalized Recommendations</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          Roles & Permissions
        </button>
      </div>

      {activeTab === 'users' ? (
        <div className="users-table-container">
          {error && (
            <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderBottom: '1px solid #fecaca' }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading users...</div>
          ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Users</th>
                <th>Roles</th>
                <th>Status</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-info">
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.roles.length > 0 ? (
                      user.roles.map((role, index) => (
                        <span key={index} className="role-badge">{role}</span>
                      ))
                    ) : (
                      <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>No roles</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'status-active' : 'status-inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={user.isActive}
                        onChange={() => toggleUserActive(user.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => openUserModal(user)}>
                      Manage Roles
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      ) : (
        <div className="roles-view">
          <button className="create-role-btn" onClick={createNewRole}>
            <span>+</span> Create New Role
          </button>
          
          <div className="roles-grid">
            {roles.map(role => (
              <div key={role.id} className="role-card">
                <div className="role-card-header">
                  <h3>{role.name}</h3>
                  <button className="action-btn" onClick={() => openRoleModal(role)}>
                    Edit Permissions
                  </button>
                </div>
                <p className="role-description">{role.description}</p>
                <div className="role-permissions-preview">
                  {Object.entries(role.permissions)
                    .filter(([_, enabled]) => enabled)
                    .slice(0, 3)
                    .map(([key]) => {
                      const perm = AVAILABLE_PERMISSIONS.find(p => p.key === key)
                      return perm ? <span key={key} className="permission-tag">{perm.label}</span> : null
                    })}
                  {Object.values(role.permissions).filter(Boolean).length > 3 && (
                    <span className="permission-tag">+{Object.values(role.permissions).filter(Boolean).length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Roles Modal */}
      {isUserModalOpen && selectedUser && (
        <div className="modal-overlay" onClick={() => setIsUserModalOpen(false)}>
          <div className="permissions-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Assign Roles to [{selectedUser.name}]</h3>
              <button className="close-btn" onClick={() => setIsUserModalOpen(false)}>×</button>
            </div>
            
            <div className="permissions-list">
              {roles.map(role => (
                <div key={role.id} className="permission-item">
                  <span className="permission-label">{role.name}</span>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={selectedUser.roles.includes(role.name)} // Check by name as per current schema
                      onChange={() => toggleUserRole(role.name)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Role Permissions Modal */}
      {isRoleModalOpen && selectedRole && (
        <div className="modal-overlay" onClick={() => setIsRoleModalOpen(false)}>
          <div className="permissions-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="text" 
                  value={selectedRole.name}
                  onChange={(e) => updateRoleName(e.target.value)}
                  onBlur={saveRoleName}
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid #4b5563', 
                    color: 'white', 
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                />
              </div>
              <button className="close-btn" onClick={() => setIsRoleModalOpen(false)}>×</button>
            </div>
            
            <div className="permissions-list">
              {AVAILABLE_PERMISSIONS.map(perm => (
                <div key={perm.id} className="permission-item">
                  <span className="permission-label">{perm.label}</span>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={selectedRole.permissions[perm.key] || false}
                      onChange={() => toggleRolePermission(perm.key)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
