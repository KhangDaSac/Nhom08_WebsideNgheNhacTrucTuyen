import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import {
  FiMusic,
  FiHeart,
  FiClock,
  FiFolder,
  FiSearch,
  FiFilter,
  FiPlus,
  FiPlay,
  FiPause,
  FiMoreVertical,
  FiTrash2,
  FiEdit2,
  FiShare2,
} from 'react-icons/fi';

const Library = () => {
  const { t } = useTranslation();
  const { currentSong, isPlaying, play, pause } = usePlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('playlists');
  const [showMenu, setShowMenu] = useState(null);

  // Mock data
  const playlists = [
    {
      id: 1,
      name: 'Favorites',
      cover: 'https://picsum.photos/200/200?random=1',
      songCount: 25,
      duration: '1h 30m',
    },
    {
      id: 2,
      name: 'Workout Mix',
      cover: 'https://picsum.photos/200/200?random=2',
      songCount: 15,
      duration: '45m',
    },
    {
      id: 3,
      name: 'Chill Vibes',
      cover: 'https://picsum.photos/200/200?random=3',
      songCount: 30,
      duration: '2h 15m',
    },
  ];

  const likedSongs = [
    {
      id: 1,
      title: 'Song One',
      artist: 'Artist One',
      album: 'Album One',
      duration: '3:45',
      cover: 'https://picsum.photos/200/200?random=4',
    },
    {
      id: 2,
      title: 'Song Two',
      artist: 'Artist Two',
      album: 'Album Two',
      duration: '4:20',
      cover: 'https://picsum.photos/200/200?random=5',
    },
  ];

  const recentlyPlayed = [
    {
      id: 1,
      title: 'Recent Song One',
      artist: 'Artist One',
      album: 'Album One',
      duration: '3:30',
      cover: 'https://picsum.photos/200/200?random=6',
    },
    {
      id: 2,
      title: 'Recent Song Two',
      artist: 'Artist Two',
      album: 'Album Two',
      duration: '4:15',
      cover: 'https://picsum.photos/200/200?random=7',
    },
  ];

  const handlePlay = (song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      play(song);
    }
  };

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('library.title')}
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t('library.description')}
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('Search for songs, artists, or albums')}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-4 py-2 text-sm ${
              activeTab === 'playlists' ? 'tab-active' : 'tab-inactive'
            }`}
          >
            {t('library.playlists')}
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`px-4 py-2 text-sm ${
              activeTab === 'liked' ? 'tab-active' : 'tab-inactive'
            }`}
          >
            {t('library.likedSongs')}
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-4 py-2 text-sm ${
              activeTab === 'recent' ? 'tab-active' : 'tab-inactive'
            }`}
          >
            {t('library.recentlyPlayed')}
          </button>
        </div>

        {/* Content */}
        <div className="grid gap-6">
          {activeTab === 'playlists' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="card group">
                  <div className="relative aspect-square">
                    <img
                      src={playlist.cover}
                      alt={playlist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                      <button className="icon-button opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all bg-white dark:bg-gray-800">
                        <FiPlay className="w-8 h-8 text-primary-600 dark:text-primary-500" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {playlist.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="badge">{playlist.songCount} songs</span>
                      <span className="badge-secondary">{playlist.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <FiHeart className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t('library.likedSongs')}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {likedSongs.length} songs
                    </p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {likedSongs.map((song) => (
                  <div
                    key={song.id}
                    className="group flex items-center gap-4 p-4 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    <div className="relative w-12 h-12">
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                      <button
                        onClick={() => handlePlay(song)}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {currentSong?.id === song.id && isPlaying ? (
                          <FiPause className="w-6 h-6 text-white" />
                        ) : (
                          <FiPlay className="w-6 h-6 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {song.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {song.artist} • {song.album}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge">{song.duration}</span>
                      <button
                        onClick={() => toggleMenu(song.id)}
                        className="icon-button"
                      >
                        <FiMoreVertical className="w-5 h-5" />
                      </button>
                      {showMenu === song.id && (
                        <div className="absolute right-4 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                          <button className="menu-item">
                            <FiEdit2 className="w-4 h-4" />
                            {t('library.edit')}
                          </button>
                          <button className="menu-item">
                            <FiShare2 className="w-4 h-4" />
                            {t('library.share')}
                          </button>
                          <button className="menu-item-danger">
                            <FiTrash2 className="w-4 h-4" />
                            {t('library.delete')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recent' && (
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                    <FiClock className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t('library.recentlyPlayed')}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {recentlyPlayed.length} songs
                    </p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentlyPlayed.map((song) => (
                  <div
                    key={song.id}
                    className="group flex items-center gap-4 p-4 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    <div className="relative w-12 h-12">
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                      <button
                        onClick={() => handlePlay(song)}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {currentSong?.id === song.id && isPlaying ? (
                          <FiPause className="w-6 h-6 text-white" />
                        ) : (
                          <FiPlay className="w-6 h-6 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {song.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {song.artist} • {song.album}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge">{song.duration}</span>
                      <button
                        onClick={() => toggleMenu(song.id)}
                        className="icon-button"
                      >
                        <FiMoreVertical className="w-5 h-5" />
                      </button>
                      {showMenu === song.id && (
                        <div className="absolute right-4 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                          <button className="menu-item">
                            <FiEdit2 className="w-4 h-4" />
                            {t('library.edit')}
                          </button>
                          <button className="menu-item">
                            <FiShare2 className="w-4 h-4" />
                            {t('library.share')}
                          </button>
                          <button className="menu-item-danger">
                            <FiTrash2 className="w-4 h-4" />
                            {t('library.delete')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library; 