import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async ({email, password}) => {
    try {
      // Simulate API call
      const response = {
        user: {
          id: '1',
          name: 'John Doe',
          email,
          password,
          accountType: 'premium',
          avatar: 'https://i.pravatar.cc/150?img=3'
        },
        token: 'dummy_token'
      };

      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      return response.user;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Simulate Google login
      const response = {
        user: {
          id: '2',
          name: 'Google User',
          email: 'google@example.com',
          accountType: 'free',
          avatar: 'https://i.pravatar.cc/150?img=4'
        },
        token: 'dummy_google_token'
      };

      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      return response.user;
    } catch (error) {
      throw new Error('Google login failed');
    }
  };

  const loginWithFacebook = async () => {
    try {
      // Simulate Facebook login
      const response = {
        user: {
          id: '3',
          name: 'Facebook User',
          email: 'facebook@example.com',
          accountType: 'free',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        token: 'dummy_facebook_token'
      };

      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      return response.user;
    } catch (error) {
      throw new Error('Facebook login failed');
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call
      const response = {
        user: {
          id: '4',
          ...userData,
          accountType: 'free',
          avatar: 'https://i.pravatar.cc/150?img=6'
        },
        token: 'dummy_token'
      };

      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      return response.user;
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateProfile = async (userData) => {
    try {
      // Simulate API call
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      throw new Error('Profile update failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        loginWithFacebook,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 