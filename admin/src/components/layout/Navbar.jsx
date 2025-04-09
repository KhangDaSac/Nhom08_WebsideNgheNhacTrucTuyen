import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiSun, FiMoon, FiBell, FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';


const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-end   h-16 px-4 sm:px-6">
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="flex items-center mx-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg"
            >
              {theme === 'light' ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>
          </div>


          {/* Profile Dropdown */}
          {
            !user ? <>
              < button
                type="button"
                onClick={() => navigate('/login')}
                className="flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-lg sm:rounded-xl shadow-sm text-sm sm:text-base font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('login.login')}
              </button>
              < button
                type="button"
                onClick={() => navigate('/signup')}
                className="flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-lg sm:rounded-xl shadow-sm text-sm sm:text-base font-medium text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('signUp.signUp')}
              </button>
            </> : <>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={user.avatar_url || ''}
                    alt="Profile"
                    className="rounded-full"
                    width="32"
                    height="32"
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        {t('navigation.profile')}
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                      >
                        {t('navigation.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          }
        </div>
      </div>
    </div >
  );
};

export default Navbar; 