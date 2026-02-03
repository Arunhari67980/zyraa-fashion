import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User Auth
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Admin Auth
  const [admin, setAdmin] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  const [loading, setLoading] = useState(true);

  // Check if user/admin is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check user session
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
          const userData = JSON.parse(userSession);
          setUser(userData);
          setIsAuthenticated(true);
        }

        // Check admin session
        const adminSession = localStorage.getItem('adminSession');
        if (adminSession) {
          const adminData = JSON.parse(adminSession);
          setAdmin(adminData);
          setIsAdminAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('userSession');
        localStorage.removeItem('adminSession');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = useCallback(async (userData) => {
    const { success, message, data } = await authService.signUp(
      userData.email,
      userData.password,
      userData.name,
      userData.phone
    );

    if (success && data) {
      return { success: true, message };
    }

    return { success: false, message };
  }, []);

  const login = useCallback(async (email, password) => {
    const { success, message, data } = await authService.login(email, password);

    if (success && data) {
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('userSession', JSON.stringify(data));
      return { success: true, message };
    }

    return { success: false, message };
  }, []);

  const adminLogin = useCallback(async (email, password) => {
    const { success, message, data } = await authService.adminLogin(email, password);

    if (success && data) {
      setAdmin(data);
      setIsAdminAuthenticated(true);
      localStorage.setItem('adminSession', JSON.stringify(data));
      return { success: true, message };
    }

    return { success: false, message };
  }, []);

  const logout = useCallback(async () => {
    const { success, message } = await authService.logout();

    if (success) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('userSession');
    }

    return { success, message };
  }, []);

  const adminLogout = useCallback(async () => {
    const { success, message } = await authService.logout();

    if (success) {
      setAdmin(null);
      setIsAdminAuthenticated(false);
      localStorage.removeItem('adminSession');
    }

    return { success, message };
  }, []);

  const createPasswordForUser = useCallback(async (userId, password) => {
    return await authService.createPasswordForUser(userId, password);
  }, []);

  const updateProfile = useCallback(
    async (updatedData) => {
      if (!user) {
        return { success: false, message: 'No user logged in' };
      }

      const { success, message } = await authService.updateUserProfile(
        user.id,
        updatedData.full_name,
        updatedData.phone
      );

      if (success) {
        setUser({
          ...user,
          full_name: updatedData.full_name,
          phone: updatedData.phone,
        });
      }

      return { success, message };
    },
    [user]
  );

  const addModerator = useCallback(
    async (email, name) => {
      if (!admin || admin.role !== 'admin') {
        return { success: false, message: 'Only admins can add moderators' };
      }

      return await authService.addModerator(admin.id, email, name);
    },
    [admin]
  );

  const getModerators = useCallback(async () => {
    if (!admin) {
      return { success: false, message: 'Not authenticated', data: null };
    }

    return await authService.getModerators();
  }, [admin]);

  const deactivateModerator = useCallback(async (moderatorId) => {
    if (!admin || admin.role !== 'admin') {
      return { success: false, message: 'Only admins can deactivate moderators' };
    }

    return await authService.deactivateModerator(moderatorId);
  }, [admin]);

  return (
    <AuthContext.Provider
      value={{
        // User auth
        user,
        isAuthenticated,
        signup,
        login,
        logout,
        updateProfile,
        createPasswordForUser,
        
        // Admin auth
        admin,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        addModerator,
        getModerators,
        deactivateModerator,
        
        // Global
        loading,
      }}
    >
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
