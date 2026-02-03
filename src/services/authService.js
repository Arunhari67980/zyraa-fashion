import { supabase } from '../lib/supabase'

// Sign up with email and password (no verification needed)
export const signUp = async (email, password, fullName, phone = '') => {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return { success: false, message: 'Email already registered', data: null }
    }

    // Hash password (basic hashing - in production use bcrypt on backend)
    const hashedPassword = await hashPassword(password)

    // Create user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: hashedPassword,
        full_name: fullName,
        phone: phone,
        role: 'customer',
        is_active: true,
      })
      .select()
      .single()

    if (userError) {
      return { success: false, message: userError.message, data: null }
    }

    return {
      success: true,
      message: 'Account created successfully! You can now login.',
      data: userData,
    }
  } catch (error) {
    return { success: false, message: error.message, data: null }
  }
}

// Login with email and password
export const login = async (email, password) => {
  try {
    // Get user from database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (userError || !userData) {
      return { success: false, message: 'Invalid email or password', data: null }
    }

    if (!userData.is_active) {
      return { success: false, message: 'Account is inactive', data: null }
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, userData.password_hash)
    
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid email or password', data: null }
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userData.id)

    const loginData = {
      id: userData.id,
      email: userData.email,
      full_name: userData.full_name,
      phone: userData.phone,
      role: userData.role,
      needs_password_setup: userData.needs_password_setup || false,
    }

    return { success: true, message: 'Login successful', data: loginData }
  } catch (error) {
    return { success: false, message: error.message, data: null }
  }
}

// Login as admin
export const adminLogin = async (email, password) => {
  try {
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !adminUser) {
      return { success: false, message: 'Invalid admin email or password', data: null }
    }

    if (!adminUser.is_active) {
      return { success: false, message: 'Admin account is inactive', data: null }
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, adminUser.password_hash)
    
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid email or password', data: null }
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminUser.id)

    const adminData = {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role, // 'admin' or 'moderator'
      is_active: adminUser.is_active,
    }

    return { success: true, message: 'Admin login successful', data: adminData }
  } catch (error) {
    return { success: false, message: error.message, data: null }
  }
}

// Create password for admin-added user
export const createPasswordForUser = async (userId, password) => {
  try {
    const hashedPassword = await hashPassword(password)

    const { error } = await supabase
      .from('users')
      .update({
        password_hash: hashedPassword,
        needs_password_setup: false,
      })
      .eq('id', userId)

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: 'Password created successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Logout
export const logout = async () => {
  try {
    return { success: true, message: 'Logged out successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Get current user session
export const getCurrentUser = async () => {
  try {
    const sessionData = localStorage.getItem('userSession')
    if (sessionData) {
      return { success: true, data: JSON.parse(sessionData) }
    }
    return { success: false, data: null }
  } catch (error) {
    return { success: false, data: null }
  }
}

// Get current admin session
export const getCurrentAdmin = async () => {
  try {
    const sessionData = localStorage.getItem('adminSession')
    if (sessionData) {
      return { success: true, data: JSON.parse(sessionData) }
    }
    return { success: false, data: null }
  } catch (error) {
    return { success: false, data: null }
  }
}

// Update user profile
export const updateUserProfile = async (userId, fullName, phone) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        full_name: fullName,
        phone: phone,
      })
      .eq('id', userId)

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: 'Profile updated successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Admin: Add new moderator by email
export const addModerator = async (adminId, email, name) => {
  try {
    // Check if email already exists as admin
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return { success: false, message: 'Email already registered as admin/moderator' }
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await hashPassword(tempPassword)

    const { data: newModerator, error } = await supabase
      .from('admin_users')
      .insert({
        email,
        name,
        password_hash: hashedPassword,
        role: 'moderator',
        created_by: adminId,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      return { success: false, message: error.message }
    }

    return {
      success: true,
      message: `Moderator added successfully. Temporary password: ${tempPassword}`,
      data: newModerator,
    }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Get all moderators (admin only)
export const getModerators = async () => {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('role', 'moderator')
      .order('created_at', { ascending: false })

    if (error) {
      return { success: false, message: error.message, data: null }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message, data: null }
  }
}

// Deactivate moderator (admin only)
export const deactivateModerator = async (moderatorId) => {
  try {
    const { error } = await supabase
      .from('admin_users')
      .update({ is_active: false })
      .eq('id', moderatorId)

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: 'Moderator deactivated' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Simple password hashing (basic implementation)
// In production, use bcrypt on the backend
const hashPassword = async (password) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Verify password
const verifyPassword = async (password, hash) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return computedHash === hash
}
