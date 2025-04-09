import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const user = {
        email, password
      };


      const response = await axios.post('http://localhost:5000/v1/auth/login',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      ;

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      const newUser = {
        _id: data.user._id,
        email: data.user.email,
        display_name: data.user.display_name,
        avatar_url: data.user.avatar_url,
        phone: data.user.phone,
        library_id: data.user.library_id,
        token: data.token,
        admin: data.user.admin
      };

      setUser(newUser);
      return data;

    } catch (error) {
      return { ...error.response.data };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/v1/auth/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
      return response.data;
    } catch (error) {
      return { ...error.response.data };
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