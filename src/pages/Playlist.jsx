import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiPlay, FiPlus, FiMoreVertical, FiClock } from 'react-icons/fi';

const Playlist = () => {
  const { t } = useTranslation();
  const { play } = usePlayer();
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate API call to fetch playlists
    const fetchPlaylists = async () => {
      try {
        // In a real app, this would be an API call
        const data = [
          {
            id: 1,
            name: 'Favorite Songs',
            description: 'My favorite songs collection',
            coverUrl: 'https://picsum.photos/200',
            songCount: 25,
            duration: '1h 45m',
            songs: [
              {
                id: 1,
                title: 'Song 1',
                artist: 'Artist 1',
                album: 'Album 1',
                duration: 180,
              },
              // Add more songs...
            ],
          },
          // Add more playlists...
        ];

        setPlaylists(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setError('Failed to load playlists');
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) {
      setError('Please enter a playlist name');
      return;
    }

    try {
      // In a real app, this would be an API call
      const newPlaylist = {
        id: playlists.length + 1,
        name: newPlaylistName,
        description: '',
        coverUrl: 'https://picsum.photos/200',
        songCount: 0,
        duration: '0m',
        songs: [],
      };

      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setShowCreateModal(false);
    } catch (error) {
      setError('Failed to create playlist');
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
          {t('playlist.myPlaylists')}
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          {t('playlist.createNew')}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Playlists Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <Link to={`/playlist/${playlist.id}`}>
              <div className="relative aspect-square">
                <img
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (playlist.songs.length > 0) {
                        play(playlist.songs[0]);
                      }
                    }}
                    className="p-3 bg-primary-500 rounded-full text-white"
                  >
                    <FiPlay className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </Link>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Link
                  to={`/playlist/${playlist.id}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 truncate"
                >
                  {playlist.name}
                </Link>
                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <FiMoreVertical className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {playlist.songCount} songs • {playlist.duration}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('playlist.createNew')}
            </h2>
            <form onSubmit={handleCreatePlaylist}>
              <div className="mb-4">
                <label
                  htmlFor="playlistName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('playlist.name')}
                </label>
                <input
                  type="text"
                  id="playlistName"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('playlist.namePlaceholder')}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md"
                >
                  {t('common.create')}
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