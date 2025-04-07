import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHome, FiSearch, FiMusic, FiRadio, FiHeart, FiPlus, FiX } from 'react-icons/fi';
import logo from '../../assets/navigation/Logo.svg';

const Sidebar = ({ onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: 'Home', icon: FiHome, path: '/', label: t('navigation.home') },
    { name: 'Search', icon: FiSearch, path: '/search', label: t('navigation.search') },
    { name: 'Playlist', icon: FiMusic, path: '/playlists', label: t('navigation.playlists') },
    { name: 'Library', icon: FiMusic, path: '/library', label: t('navigation.library') },
    { name: 'Artists', icon: FiMusic, path: '/artists', label: t('navigation.artists') },
    { name: 'Albums', icon: FiMusic, path: '/albums', label: t('navigation.albums') }
  ];

  const playlists = [
    { id: 1, name: 'Favorite Songs' },
    { id: 2, name: 'Recently Played' },
    { id: 3, name: 'Recommended' },
    { id: 4, name: 'My Playlist #1' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      {/* Logo and Close Button */}
      <div className="sticky top-0 z-10 p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-8 w-8 rounded-lg"
          />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            Music for you
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-none">
        <div className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {t(item.label)}
            </Link>
          ))}
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;