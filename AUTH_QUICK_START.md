# Supabase Authentication Quick Start

## ✅ What's Been Set Up

### 1. **Auth Service** (`src/services/authService.js`)
- `signUp(email, password, fullName, phone)` - Create new account
- `login(email, password)` - Login user
- `logout()` - Logout user
- `getCurrentUser()` - Check if user is logged in
- `updateUserProfile(userId, fullName, phone)` - Update user info
- `resetPassword(email)` - Send password reset email

### 2. **Auth Context** (`src/context/AuthContext.jsx`)
- Manages user state across the app
- Auto-restores user session on page load
- Listens for real-time auth changes
- Provides loading state during auth operations

### 3. **Updated Pages**
- **Login** (`src/pages/Login.jsx`) - Now uses Supabase auth
- **Signup** (`src/pages/Signup.jsx`) - Now uses Supabase auth

---

## 🚀 Setup Instructions

### Step 1: Run SQL in Supabase

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Create new query
4. Copy and paste from **supabase-auth-setup.sql**
5. Click **Run**

This creates:
- ✅ profiles table
- ✅ Row Level Security policies
- ✅ Auto-profile creation trigger

### Step 2: Test the App

Your dev server is already running at **http://localhost:5174**

**Try these flows:**

#### Sign Up
```
1. Go to /signup
2. Fill in form (email, password, name)
3. Click "Create Account"
4. You should see success message
5. Then redirected to login
```

#### Login
```
1. Go to /login
2. Enter your signup email and password
3. Click "Sign In"
4. You should be logged in
```

#### Check Auth
- Look at navbar - you should see your name if logged in
- Refresh page - you should stay logged in
- Check browser DevTools → Application → Cookies for auth tokens

---

## 📊 How It Works

### User Flow

```
Sign Up Form
    ↓
authService.signUp() 
    ↓
Supabase Auth (creates user)
    ↓
Create profile in DB
    ↓
Show success message
    ↓
Redirect to login
```

### Login Flow

```
Login Form
    ↓
authService.login()
    ↓
Supabase Auth (verifies credentials)
    ↓
Get profile data
    ↓
Store in AuthContext
    ↓
Redirect to home
```

### Auto-Restore Session

```
App Loads
    ↓
AuthContext checks Supabase session
    ↓
If valid session found:
  - Fetch user profile
  - Update AuthContext
  - User stays logged in
    ↓
If no session:
  - Keep user logged out
```

---

## 🔐 Security Features

✅ **Email/Password Hashing** - Handled by Supabase  
✅ **Session Management** - Automatic token refresh  
✅ **Row Level Security** - Users only see their data  
✅ **CSRF Protection** - Built into Supabase  
✅ **Secure Cookies** - HttpOnly flags on auth tokens  

---

## 📱 Features Available

### Implemented ✅
- Sign up with email/password
- Login with email/password
- Logout
- Auto-restore user session
- Store user profile (name, phone)
- Password strength indicator
- Form validation
- Error messages
- Loading states

### Ready to Implement
- 📧 Email verification
- 🔑 Password reset
- 🤖 Social login (Google, GitHub)
- 👤 Profile edit page
- 🖼️ Avatar upload
- 🔔 Email notifications

---

## 🛠️ Code Examples

### Check if User is Logged In

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

### Logout User

```javascript
import { useAuth } from './context/AuthContext'

function LogoutButton() {
  const { logout } = useAuth()
  
  const handleLogout = async () => {
    await logout()
    // User is now logged out
  }
  
  return <button onClick={handleLogout}>Logout</button>
}
```

### Update User Profile

```javascript
import { useAuth } from './context/AuthContext'

function UpdateProfile() {
  const { updateProfile } = useAuth()
  
  const handleUpdate = async () => {
    const result = await updateProfile({
      full_name: 'John Doe',
      phone: '+1234567890'
    })
    
    if (result.success) {
      console.log('Profile updated!')
    }
  }
  
  return <button onClick={handleUpdate}>Update</button>
}
```

---

## 🧪 Testing Credentials

After signup, use your test email and password to login:

```
Email: test@example.com
Password: TestPassword123!
```

---

## ❓ FAQ

**Q: Where are passwords stored?**  
A: Never in your database. Supabase handles password hashing and storage securely.

**Q: How long does login stay active?**  
A: Default is 1 week. You can configure in Supabase settings.

**Q: Can I add social login later?**  
A: Yes! Go to Auth → Providers in Supabase dashboard.

**Q: Why am I asked to verify email?**  
A: Optional. Can be disabled in Auth → Email settings in Supabase.

**Q: How do I reset a user's password?**  
A: User clicks "Forgot password?" on login page → gets reset email.

---

## 📞 Support

Refer to these files for more info:
- [SUPABASE_AUTH_SETUP.md](SUPABASE_AUTH_SETUP.md) - Detailed setup guide
- [src/services/authService.js](src/services/authService.js) - Auth functions
- [src/context/AuthContext.jsx](src/context/AuthContext.jsx) - Auth state management
- [supabase-auth-setup.sql](supabase-auth-setup.sql) - Database setup

All done! Your Supabase authentication is ready to use! 🎉
