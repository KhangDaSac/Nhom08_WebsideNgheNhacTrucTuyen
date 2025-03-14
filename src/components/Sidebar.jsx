import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHome, FiSearch, FiMusic, FiRadio, FiHeart, FiPlus, FiMenu } from 'react-icons/fi';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Search', icon: FiSearch, path: '/search' },
    { name: 'Library', icon: FiMusic, path: '/library' },
    { name: 'Radio', icon: FiRadio, path: '/radio' },
  ];

  const playlists = [
    { id: 1, name: 'Favorite Songs' },
    { id: 2, name: 'Recently Played' },
    { id: 3, name: 'Recommended' },
    { id: 4, name: 'My Playlist #1' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8 rounded-lg"
          />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            Music App
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {t(item.name)}
            </Link>
          ))}
        </div>

        {/* Playlists */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('Your Playlists')}
            </h2>
            <button className="p-1 rounded-md text-gray-400 hover:text-gray-500">
              <FiPlus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <FiHeart className="w-5 h-5 mr-3" />
                {playlist.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button className="p-3 bg-primary-500 text-white rounded-full shadow-lg">
          <FiMenu className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 