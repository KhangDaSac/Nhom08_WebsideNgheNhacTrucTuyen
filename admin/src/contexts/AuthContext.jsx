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
      if(newUser.admin){
      setUser(newUser);
        return data;
      }else{
        return {success: false, message: 'You are not authorized to login as admin'}
      }

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
        logout
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