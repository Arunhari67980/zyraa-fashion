# Supabase Authentication Setup Guide

## Overview
This guide explains how to set up Supabase authentication for your Zyraa Fashion e-commerce application.

## Step 1: Create Supabase Auth Tables

1. Go to your **Supabase Project Dashboard**
2. Click on **SQL Editor** in the left sidebar
3. Create a new query
4. Copy and paste the contents of **supabase-auth-setup.sql**
5. Click **Run** to execute the SQL

This will create:
- `profiles` table linked to Supabase auth users
- Row Level Security policies
- Automatic profile creation trigger

## Step 2: Configure Email Settings (Optional)

To enable email verification and password reset:

1. Go to **Authentication** → **Providers**
2. Click on **Email**
3. Configure email templates if needed
4. Save settings

## Step 3: Test Authentication

### Sign Up
1. Go to `http://localhost:5174/signup`
2. Fill in the form with:
   - Full Name: Your name
   - Email: Your email
   - Phone: Optional
   - Password: At least 6 characters
3. Accept terms and create account
4. You should see success message or be redirected to login

### Login
1. Go to `http://localhost:5174/login`
2. Enter your email and password
3. Click "Sign In"
4. You should be logged in and see your user info in the navbar

### Logout
1. Click the user menu in the navbar
2. Click "Logout"
3. You should be redirected and logged out

## Features Implemented

✅ **Sign Up**
- Email validation
- Password strength indicator
- Phone number (optional)
- Terms acceptance
- Auto profile creation

✅ **Login**
- Email/password authentication
- Remember me option
- Show/hide password toggle
- Error handling

✅ **Logout**
- Secure logout
- Session clearing

✅ **Auto Auth Check**
- Check user session on app load
- Restore user state if logged in
- Real-time auth state changes

✅ **User Profile**
- Store full name and phone
- Update profile information
- Linked to Supabase auth users

## Database Schema

### profiles table
```
id (UUID) - Links to auth.users
full_name (TEXT)
phone (TEXT)
avatar_url (TEXT)
created_at (TIMESTAMPTZ)
updated_at (TIMESTAMPTZ)
```

## API Endpoints Used

All authentication is handled through Supabase client library:

```javascript
// Sign up
supabase.auth.signUp({ email, password })

// Login
supabase.auth.signInWithPassword({ email, password })

// Logout
supabase.auth.signOut()

// Get session
supabase.auth.getSession()

// Listen for auth changes
supabase.auth.onAuthStateChange()

// Profile operations
supabase.from('profiles').select/insert/update/delete()
```

## Security Notes

⚠️ **Important Security Practices:**

1. **Row Level Security (RLS)** is enabled on the profiles table
2. **Passwords are never stored** in localStorage - handled by Supabase
3. **Session tokens** are managed by Supabase auth
4. **CSRF protection** is built-in to Supabase
5. **Email verification** can be enabled in auth settings

## Troubleshooting

### "Email already registered"
- Email already exists in Supabase
- Try with a different email or reset password

### "Invalid email or password"
- Check email spelling
- Ensure password is correct
- Password is case-sensitive

### User not staying logged in
- Check if auth session is being restored
- Verify `.env.local` has correct Supabase credentials
- Clear browser cache and try again

### Profile not created
- Check that auth trigger is active in Supabase
- Verify profiles table RLS policies are correct

## Next Steps

1. **Enable Email Verification**
   - Go to Auth → Email
   - Toggle "Confirm email" option

2. **Add Social Login**
   - Go to Auth → Providers
   - Enable Google, GitHub, etc.

3. **Implement Password Reset**
   - Route: `/forgot-password` (already created in authService)
   - Sends reset email to user

4. **Add User Profile Page**
   - Create `/profile` page
   - Use `updateUserProfile()` from authService

5. **Link Orders to Users**
   - Update orders table to store `user_id`
   - Only show user's own orders

## File References

- **Auth Service**: `src/services/authService.js`
- **Auth Context**: `src/context/AuthContext.jsx`
- **Login Page**: `src/pages/Login.jsx`
- **Signup Page**: `src/pages/Signup.jsx`
- **Supabase Config**: `src/lib/supabase.js`
