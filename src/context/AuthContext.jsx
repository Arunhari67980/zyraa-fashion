import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        return typeof parsed === 'object' ? parsed : null;
      }
      return null;
    } catch (e) {
      // Invalid JSON in localStorage, clear it
      localStorage.removeItem('user');
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        return typeof parsed === 'object' && parsed !== null;
      }
      return false;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const signup = useCallback((userData) => {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    const emailExists = existingUsers.some(u => u.email === userData.email);
    if (emailExists) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: `USER-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this should be hashed
      phone: userData.phone || '',
      createdAt: new Date().toISOString(),
    };

    // Save to users list
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Log the user in (without password in state)
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);

    return { success: true, message: 'Account created successfully' };
  }, []);

  const login = useCallback((email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    const foundUser = existingUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }, []);

  const updateProfile = useCallback((updatedData) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = existingUsers.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updatedData };
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      const { password, ...userWithoutPassword } = existingUsers[userIndex];
      setUser(userWithoutPassword);
      return { success: true, message: 'Profile updated successfully' };
    }

    return { success: false, message: 'Failed to update profile' };
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signup,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
