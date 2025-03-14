import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHome, FiCompass, FiMusic, FiDisc, FiMic, FiHeart, FiList } from 'react-icons/fi';
import logo from '../../assets/navigation/Logo.svg';

const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems = [
    { icon: FiHome, text: 'Home', path: '/' },
    { icon: FiCompass, text: 'Explore', path: '/explore' },
    { icon: FiMusic, text: 'Playlists', path: '/playlist' },
    { icon: FiDisc, text: 'Albums', path: '/albums' },
    { icon: FiMic, text: 'Artists', path: '/artists' },
  ];

  const libraryItems = [
    { icon: FiHeart, text: 'Liked Songs', path: '/liked-songs' },
    { icon: FiList, text: 'Your Library', path: '/library' },
  ];

  const NavItem = ({ icon: Icon, text, path }) => (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`
      }
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{text}</span>
    </NavLink>
  );

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Music for you</span>
        </div>

        {/* Main Menu */}
        <nav className="space-y-1 mb-8">
          <div className="mb-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Menu
          </div>
          {menuItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        {/* Library Section */}
        <nav className="space-y-1">
          <div className="mb-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Library
          </div>
          {libraryItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 