import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPlay, FiPlus, FiMoreVertical, FiClock } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import PlaylistCards from '../components/basic-component/playlist-card/PlaylistCards';
import { useLibrary } from '../contexts/LibraryContext';
import { useToast } from '../contexts/ToastContext';

const Playlist = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { playlists, createPlaylist, fetchLibrary} = useLibrary();
  const { showErrorToast } = useToast();

  useEffect(() => {
    if (playlists)
      setIsLoading(false);
  }, [playlists]);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if(playlists.length >= 5){
      showErrorToast(t('playlists.maxPlaylistsError'));
      setShowCreateModal(false);
      return;
    }

    try {
      console.log('Creating playlist:', {
        playlist_name: newPlaylistName,
        library_id: user.library_id,
      });
      await createPlaylist({ playlist_name: newPlaylistName })
      fetchLibrary();
      setShowCreateModal(false);
      setNewPlaylistName('');
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('playlists.title')}
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          {t('playlists.createPlaylist')}
        </button>
      </div>


      {/* Playlists */}
      {playlists?.length > 0 ? (
        <div>
          <PlaylistCards playlists={playlists}></PlaylistCards>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">{t('playlists.noPlaylists')}</p>
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('playlists.createPlaylist')}
            </h2>
            <form onSubmit={handleCreatePlaylist}>
              <div className="mb-4">
                <label
                  htmlFor="playlistName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('playlists.playlistName')}
                </label>
                <input
                  type="text"
                  id="playlistName"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('playlists.playlistNamePlaceholder')}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  {t('playlists.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md"
                >
                  {t('playlists.create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist; 