/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, } from 'react';
import { userAPI } from '../services/api.js';

// Create the context
const AuthContext = createContext();

// Create the Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // We wrap initializeAuth in useCallback or define it inside useEffect 
  // to avoid unnecessary re-renders during development (Fast Refresh friendly)
  useEffect(() => {

  const initializeAuth = async () => {

    try {

      const res = await userAPI.getProfile();

      setUser(res.user);

    } catch (err) {

      setUser(null);

    } finally {

      setLoading(false);
    }
  };

  initializeAuth();

}, []);

  const login = async (email, password) => {
    const res = await userAPI.login({ email, password });
    setUser(res.user);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await userAPI.register({ name, email, password });
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    try {
      // It's vital to call the backend so it can clear the HttpOnly cookie
      await userAPI.logout();
    } catch (err) {
      console.error("Session could not be cleared on server", err);
    } finally {
      setUser(null);
    }
  };

  // Provide the state and methods
  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user, // Helper boolean
  };

  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
};

export default AuthContext;

