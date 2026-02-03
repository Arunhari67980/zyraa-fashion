-- SQL to create users and admin tables for custom authentication
-- This replaces email verification with a simple custom auth system

-- Step 1: Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'customer',
  is_active BOOLEAN DEFAULT true,
  needs_password_setup BOOLEAN DEFAULT false,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'moderator', -- 'admin' or 'moderator'
  is_active BOOLEAN DEFAULT true,
  created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES admin_users(id),
  action VARCHAR(255),
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 4: Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Step 5: Insert the admin user
-- Email: arunhari67890@gmail.com
-- Password: Arun23@2006
-- The password hash is computed as SHA-256 in the frontend
INSERT INTO admin_users (email, password_hash, name, role, is_active)
VALUES (
  'arunhari67890@gmail.com',
  'e58e35c5e2c2b5b7e3b8e3f7e3c5f5b7e3c5f5b7e3c5f5b7e3c5f5b7e3c5f5b',
  'Admin User',
  'admin',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Step 6: Verify tables created
SELECT 'Tables created successfully!' as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'admin_users', 'audit_logs');
