-- Custom authentication setup (no email verification required)

-- Drop existing tables if they exist (CAREFUL: only for development)
-- DROP TABLE IF EXISTS admin_users CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'customer',
  is_active BOOLEAN DEFAULT true,
  needs_password_setup BOOLEAN DEFAULT false,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users table (for admin and moderators)
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'moderator', -- 'admin' or 'moderator'
  is_active BOOLEAN DEFAULT true,
  permissions JSONB DEFAULT '{"users": false, "products": false, "orders": false, "analytics": false}'::jsonb,
  created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Insert the initial admin user
-- Password: Arun23@2006 (hashed with SHA-256)
INSERT INTO admin_users (email, password_hash, name, role, is_active)
VALUES (
  'arunhari67890@gmail.com',
  'e58e35c5e2c2b5b7e3b8e3f7e3c5f5b7e3c5f5b7e3c5f5b7e3c5f5b7e3c5f5b', -- This is placeholder, needs real hash
  'Admin',
  'admin',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES admin_users(id),
  action VARCHAR(255),
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verify tables
SELECT tablename FROM pg_tables 
WHERE tablename IN ('users', 'admin_users', 'audit_logs') 
AND schemaname = 'public';
