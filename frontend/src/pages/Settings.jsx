import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import {
  FiMoon,
  FiSun,
  FiGlobe,
  FiVolume2,
  FiDownload,
  FiBell,
  FiShield,
  FiLogOut,
  FiChevronRight,
} from 'react-icons/fi';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [audioQuality, setAudioQuality] = useState('high');
  const [downloadQuality, setDownloadQuality] = useState('high');
  const [notifications, setNotifications] = useState({
    newReleases: true,
    playlistUpdates: true,
    artistUpdates: false,
    newsletters: true,
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' },
  ];

  const audioQualities = [
    { value: 'auto', label: t('settings.quality.auto') },
    { value: 'low', label: t('settings.quality.low') },
    { value: 'medium', label: t('settings.quality.medium') },
    { value: 'high', label: t('settings.quality.high') },
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderSection = ({ title, icon, children, description }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="pl-11">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('settings.title')}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{user?.email}</span>
            <span>•</span>
            <span>{user?.isPremium ? 'Premium' : 'Free'}</span>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Appearance */}
          {renderSection({
            title: t('settings.appearance'),
            icon: theme === 'dark' ? (
              <FiMoon className="w-5 h-5 text-primary-500" />
            ) : (
              <FiSun className="w-5 h-5 text-primary-500" />
            ),
            description: t('settings.appearance.description'),
            children: (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <label className="text-gray-700 dark:text-gray-300">
                    {t('settings.theme')}
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="light">{t('settings.theme.light')}</option>
                    <option value="dark">{t('settings.theme.dark')}</option>
                    <option value="system">{t('settings.theme.system')}</option>
                  </select>
                </div>
              </div>
            ),
          })}

          {/* Language */}
          {renderSection({
            title: t('settings.language'),
            icon: <FiGlobe className="w-5 h-5 text-primary-500" />,
            description: t('settings.language.description'),
            children: (
              <div className="grid grid-cols-2 gap-3">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center justify-center px-4 py-3 rounded-lg border transition-colors duration-200 ${
                      i18n.language === language.code
                        ? 'border-primary-500 text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500'
                    }`}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            ),
          })}

          {/* Playback */}
          {renderSection({
            title: t('settings.playback'),
            icon: <FiVolume2 className="w-5 h-5 text-primary-500" />,
            description: t('settings.playback.description'),
            children: (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <label className="text-gray-700 dark:text-gray-300">
                    {t('settings.audioQuality')}
                  </label>
                  <select
                    value={audioQuality}
                    onChange={(e) => setAudioQuality(e.target.value)}
                    className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {audioQualities.map((quality) => (
                      <option key={quality.value} value={quality.value}>
                        {quality.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ),
          })}

          {/* Downloads */}
          {renderSection({
            title: t('settings.downloads'),
            icon: <FiDownload className="w-5 h-5 text-primary-500" />,
            description: t('settings.downloads.description'),
            children: (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <label className="text-gray-700 dark:text-gray-300">
                    {t('settings.downloadQuality')}
                  </label>
                  <select
                    value={downloadQuality}
                    onChange={(e) => setDownloadQuality(e.target.value)}
                    className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {audioQualities.map((quality) => (
                      <option key={quality.value} value={quality.value}>
                        {quality.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ),
          })}

          {/* Notifications */}
          {renderSection({
            title: t('settings.notifications'),
            icon: <FiBell className="w-5 h-5 text-primary-500" />,
            description: t('settings.notifications.description'),
            children: (
              <div className="space-y-3">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <label className="text-gray-700 dark:text-gray-300">
                      {t(`settings.notifications.${key}`)}
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotifications((prev) => ({
                            ...prev,
                            [key]: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            ),
          })}

          {/* Privacy */}
          {renderSection({
            title: t('settings.privacy'),
            icon: <FiShield className="w-5 h-5 text-primary-500" />,
            description: t('settings.privacy.description'),
            children: (
              <div className="space-y-4">
                <button className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <span className="text-gray-700 dark:text-gray-300">
                    {t('settings.privacy.viewPolicy')}
                  </span>
                  <FiChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ),
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 p-4 text-red-500 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            {t('settings.logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 