-- Create users table (custom auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'guest')),
  is_active BOOLEAN DEFAULT true,
  needs_password_setup BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'moderator')),
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES admin_users(id),
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Disable Row Level Security for custom auth (not using Supabase Auth)
-- RLS will be handled by app-level authentication instead
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Insert admin user (arunhari67890@gmail.com with password Arun23@2006)
-- SHA-256 hash of "Arun23@2006": 62e8b6dce6a9d49aebfe6fc6492851163192163a6acfb352c8245de7f4856ffd
INSERT INTO admin_users (email, password_hash, name, role, is_active) 
VALUES (
  'arunhari67890@gmail.com',
  '62e8b6dce6a9d49aebfe6fc6492851163192163a6acfb352c8245de7f4856ffd',
  'Arun Admin',
  'admin',
  true
)
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  is_active = true;

-- Verify tables
SELECT 'users' as table_name FROM information_schema.tables WHERE table_name = 'users'
UNION ALL
SELECT 'admin_users' as table_name FROM information_schema.tables WHERE table_name = 'admin_users';
