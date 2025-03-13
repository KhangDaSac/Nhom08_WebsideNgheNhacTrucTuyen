import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCamera,
  FiEdit2,
  FiSave,
  FiX,
  // FiCrown,
  FiCreditCard,
  FiBell,
  FiShield,
  FiLogOut,
} from 'react-icons/fi';

const Account = () => {
  const { t } = useTranslation();
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    avatar: user?.avatar || 'https://picsum.photos/200',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('account.title')}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{user?.email}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              {user?.isPremium ? (
                <>
                  <FiCrown className="w-4 h-4 text-yellow-500" />
                  Premium
                </>
              ) : (
                'Free'
              )}
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <FiUser className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('account.profile')}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('account.profileDescription')}
                  </p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-500 hover:text-primary-600"
                >
                  <FiEdit2 className="w-4 h-4" />
                  {t('account.edit')}
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                    {t('account.cancel')}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 disabled:opacity-50"
                  >
                    <FiSave className="w-4 h-4" />
                    {isLoading ? t('account.saving') : t('account.save')}
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiCamera className="w-6 h-6 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {t('account.changePhoto')}
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('account.name')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('account.email')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('account.phone')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('account.dateOfBirth')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-500 text-center">{error}</div>
            )}
          </div>

          {/* Subscription Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                <FiCreditCard className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('account.subscription')}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('account.subscriptionDescription')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-3">
                <FiCrown className="w-6 h-6 text-yellow-500" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {user?.isPremium ? 'Premium Plan' : 'Free Plan'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.isPremium
                      ? 'Enjoy ad-free music and offline listening'
                      : 'Upgrade to Premium for better features'}
                  </p>
                </div>
              </div>
              {!user?.isPremium && (
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600">
                  {t('account.upgrade')}
                </button>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 p-4 text-red-500 hover:text-red-600 font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            {t('account.logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account; 