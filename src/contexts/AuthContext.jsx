import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem('user')); 
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const newUser = {
        email: email,
        password: password,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      localStorage.setItem('user', userData);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      setUser({ ...user, ...userData });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
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

export default AuthContext; 