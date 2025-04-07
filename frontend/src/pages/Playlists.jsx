import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiPlay, FiPlus, FiMoreVertical, FiClock } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import PlaylistCards from '../components/basic-component/playlist-card/PlaylistCards';
import axios from 'axios';

const Playlist = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/libraries/playlists/${user.library_id}`);
      const data = response.data.data.playlists;
      setPlaylists(data);
      setIsLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating playlist:', {
        playlist_name: newPlaylistName,
        library_id: user.library_id,
      });
      const response = await axios.post('http://localhost:5000/api/playlists/create', {
        playlist_name: newPlaylistName,
        library_id: user.library_id,
      });
      fetchPlaylists();
      setIsLoading(false);
      setShowCreateModal(false);
      setNewPlaylistName('');
    } catch (error) {
      console.error('Error creating playlist:', error);
      setIsLoading(false);
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


      {/* Playlists Grid */}
      <PlaylistCards playlists={playlists}></PlaylistCards>

      {/* Create Playlist Modal */}
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