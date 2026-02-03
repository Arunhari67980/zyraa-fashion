# Custom Authentication Setup Guide

## 🔐 What's Been Changed

Your authentication system has been completely rewritten to:
- ✅ **No email verification needed** - Users can signup and login immediately
- ✅ **Custom admin system** - Admin can add moderators with limited access
- ✅ **Moderator management** - Admin can manage and deactivate moderators
- ✅ **Password-on-first-login** - When admin adds email, user sets password on first login
- ✅ **Two authentication types** - User login (customer) and Admin/Moderator login

---

## 📋 Quick Setup (5 Steps)

### Step 1: Create Database Tables
1. Go to **Supabase Dashboard** → **SQL Editor**
2. Create a **new query**
3. Copy entire contents from **CUSTOM_AUTH_SETUP.sql**
4. Click **Run**
5. ✅ Tables created with admin user

### Step 2: Update Signup Page (Optional - Already Done)
✅ Already configured to allow instant signup without verification

### Step 3: Test User Signup
```
1. Go to http://localhost:5174/signup
2. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Password: Test123!
   - Phone: Optional
3. Click "Create Account"
4. ✅ Account created instantly (no email verification)
5. Redirected to login
```

### Step 4: Test User Login
```
1. Go to http://localhost:5174/login
2. Enter:
   - Email: john@example.com
   - Password: Test123!
3. Click "Sign In"
4. ✅ Logged in successfully
```

### Step 5: Test Admin Login
```
1. Go to http://localhost:5174/admin-login
2. Enter:
   - Email: arunhari67890@gmail.com
   - Password: Arun23@2006
3. Click "Admin Sign In"
4. ✅ Logged in to admin dashboard
5. Can see "Add Moderator" button
```

---

## 👥 User Types & Access

### Regular User (Customer)
- ✅ Sign up with email/password
- ✅ Login with email/password
- ✅ Browse products
- ✅ Add to cart
- ✅ Add to wishlist
- ✅ Place orders
- ❌ Cannot access admin features

### Moderator
- ✅ Login with email (set password on first login)
- ✅ Limited admin dashboard access
- ✅ Can manage products (if permissions set)
- ✅ Can manage orders (if permissions set)
- ✅ Cannot add other moderators
- ❌ Cannot access full admin features

### Admin
- ✅ Login with email/password
- ✅ Full admin dashboard access
- ✅ Add/remove moderators
- ✅ Manage all products
- ✅ Manage all orders
- ✅ View analytics
- ✅ Manage users

---

## 🔑 Admin Account Details

**Email:** `arunhari67890@gmail.com`  
**Password:** `Arun23@2006`  
**Role:** Admin  
**Status:** Active

---

## 📊 Database Schema

### users table
```
id              SERIAL PRIMARY KEY
email           VARCHAR(255) UNIQUE
password_hash   VARCHAR(255)
full_name       VARCHAR(255)
phone           VARCHAR(20)
role            VARCHAR(50) - 'customer', 'user', etc.
is_active       BOOLEAN
needs_password_setup BOOLEAN - true if user needs to set password
last_login      TIMESTAMPTZ
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

### admin_users table
```
id              SERIAL PRIMARY KEY
email           VARCHAR(255) UNIQUE
password_hash   VARCHAR(255)
name            VARCHAR(255)
role            VARCHAR(50) - 'admin' or 'moderator'
is_active       BOOLEAN
created_by      INTEGER - which admin created this moderator
last_login      TIMESTAMPTZ
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

### audit_logs table
```
id              SERIAL PRIMARY KEY
admin_id        INTEGER
action          VARCHAR(255)
details         JSONB
created_at      TIMESTAMPTZ
```

---

## 🚀 How It Works

### User Signup Flow
```
User enters email + password
    ↓
Check if email already exists
    ↓
Hash password (SHA-256)
    ↓
Create user in database
    ↓
✅ Account created immediately (no email verification)
    ↓
Redirect to login
```

### User Login Flow
```
User enters email + password
    ↓
Find user in database
    ↓
Verify password hash
    ↓
Check if account is active
    ↓
✅ Login successful
    ↓
Store session in localStorage
    ↓
Redirect to home
```

### Admin Add Moderator Flow
```
Admin enters: email + name
    ↓
Check if email already exists
    ↓
Create moderator record (no password set yet)
    ↓
✅ Moderator added
    ↓
Moderator receives email with credentials
    ↓
On first login, moderator sets password
```

### First-Time Moderator Login Flow
```
Moderator enters email + password
    ↓
Check if password is set
    ↓
If NOT set: Show password setup form
    ↓
Moderator sets new password
    ↓
✅ Password created
    ↓
Moderator logged in
    ↓
Access admin dashboard
```

---

## 📱 Testing Accounts

### Regular User Account
Create yourself at `/signup`

### Moderator Account (Add from Admin Dashboard)
1. Login as admin at `/admin-login`
2. Click "Add Moderator"
3. Enter moderator email and name
4. Moderator can then login at `/login` with their email
5. On first login, they set their password

### Admin Account
**Email:** arunhari67890@gmail.com  
**Password:** Arun23@2006

---

## 🔗 URLs

| Page | URL |
|------|-----|
| User Signup | `/signup` |
| User Login | `/login` |
| Admin Login | `/admin-login` |
| Admin Dashboard | `/admin/dashboard` |
| Home | `/` |
| Products | `/dresses`, `/jackets`, etc. |
| Cart | `/cart` |

---

## 🛠️ Key Features

### Authentication Service (`src/services/authService.js`)

**User Functions:**
- `signUp(email, password, fullName, phone)` - Create account
- `login(email, password)` - Login user
- `createPasswordForUser(userId, password)` - Set password on first login
- `logout()` - Logout user
- `updateUserProfile(userId, fullName, phone)` - Update profile

**Admin Functions:**
- `adminLogin(email, password)` - Login admin
- `addModerator(adminId, email, name)` - Add new moderator
- `getModerators()` - Get all moderators
- `deactivateModerator(moderatorId)` - Deactivate moderator

### Auth Context (`src/context/AuthContext.jsx`)

Provides global auth state:
```javascript
const { 
  user, 
  isAuthenticated, 
  login, 
  signup, 
  logout,
  admin, 
  isAdminAuthenticated, 
  adminLogin, 
  adminLogout, 
  addModerator, 
  getModerators 
} = useAuth()
```

---

## 🔒 Security Notes

⚠️ **Current Implementation (Development Only):**
- Using SHA-256 for password hashing
- Storing password hash in database
- No rate limiting on login attempts
- No CSRF tokens

⚠️ **For Production:**
1. Use **bcrypt** for password hashing (not SHA-256)
2. Implement **rate limiting** on login
3. Add **CSRF tokens**
4. Use **HTTPS only**
5. Implement **2FA** (two-factor authentication)
6. Add **password reset** functionality
7. Use **secure sessions** with httpOnly cookies
8. Implement **audit logging**
9. Add **IP whitelisting** for admin
10. Regular **security audits**

---

## 📚 Code Examples

### Check if User Logged In
```javascript
import { useAuth } from './context/AuthContext'

function MyComponent() {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <div>Please log in</div>
  }
  
  return <div>Welcome, {user.full_name}!</div>
}
```

### Check if Admin Logged In
```javascript
import { useAuth } from './context/AuthContext'

function AdminComponent() {
  const { admin, isAdminAuthenticated } = useAuth()
  
  if (!isAdminAuthenticated || admin.role !== 'admin') {
    return <div>Admin access only</div>
  }
  
  return <div>Admin Dashboard</div>
}
```

### Add Moderator (Admin Only)
```javascript
import { useAuth } from './context/AuthContext'

function AddModeratorForm() {
  const { addModerator } = useAuth()
  
  const handleAdd = async (email, name) => {
    const result = await addModerator(email, name)
    if (result.success) {
      console.log('Moderator added:', result.message)
    }
  }
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleAdd(email, name)
    }}>
      {/* form fields */}
    </form>
  )
}
```

---

## ✅ Checklist

- [ ] Run CUSTOM_AUTH_SETUP.sql in Supabase
- [ ] Test user signup at `/signup`
- [ ] Test user login at `/login`
- [ ] Test admin login at `/admin-login`
- [ ] Test add moderator from admin dashboard
- [ ] Test moderator first-time login (set password)
- [ ] Test moderator dashboard access
- [ ] Test logout functionality
- [ ] Test session restore on refresh

---

## 🐛 Troubleshooting

### "Email already registered"
- Email is already in users or admin_users table
- Use different email or reset database

### "Invalid email or password"
- Email doesn't exist OR
- Password is incorrect
- Check spelling

### Moderator can't login
- Moderator may not have password set yet
- First login requires password creation

### Admin features not showing
- Verify admin role in database
- Check `is_active = true`

### Table not found error
- Run CUSTOM_AUTH_SETUP.sql in SQL Editor
- Verify you're in correct Supabase project

---

## 🚀 Next Steps

1. **Email Notifications** (Optional)
   - Send email to moderator when added
   - Include temporary password or setup link

2. **Moderator Permissions** (Advanced)
   - Add permissions column to admin_users
   - Control what each moderator can access
   - Fine-grained role-based access control

3. **Audit Logging** (Security)
   - Log all admin actions
   - Track moderator activities
   - User activity logging

4. **Two-Factor Authentication** (Security)
   - Add 2FA for admin accounts
   - Optional 2FA for users

5. **Session Management** (Advanced)
   - Add logout from all devices
   - Track active sessions
   - Login from specific IP only

---

## 📞 Support

- **Files Modified:** `src/context/AuthContext.jsx`, `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/pages/AdminLogin.jsx`, `src/pages/AdminDashboard.jsx`
- **Files Created:** `CUSTOM_AUTH_SETUP.sql`, `src/services/authService.js`
- **Environment:** Custom auth using Supabase tables
- **Password Hashing:** SHA-256 (use bcrypt in production)

**Everything is ready! Test it now at http://localhost:5174** 🎉
