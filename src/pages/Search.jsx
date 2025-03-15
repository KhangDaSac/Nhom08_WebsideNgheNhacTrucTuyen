import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiSearch, FiPlay, FiClock } from 'react-icons/fi';

const Search = () => {
  const { t } = useTranslation();
  const { play, currentSong, isPlaying } = usePlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({
    songs: [],
    albums: [],
    artists: [],
    playlists: [],
  });
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch();
      } else {
        setResults({
          songs: [],
          albums: [],
          artists: [],
          playlists: [],
        });
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const data = {
        songs: [
          {
            id: 1,
            title: 'Song Title 1',
            artist: 'Artist Name',
            album: 'Album Name',
            duration: 180,
            coverUrl: 'https://picsum.photos/100',
          },
          // Add more songs...
        ],
        albums: [
          {
            id: 1,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            year: 2024,
          },
          // Add more albums...
        ],
        artists: [
          {
            id: 1,
            name: 'Artist Name 1',
            imageUrl: 'https://picsum.photos/200',
            followers: '1.2M',
          },
          // Add more artists...
        ],
        playlists: [
          {
            id: 1,
            name: 'Playlist Name 1',
            coverUrl: 'https://picsum.photos/200',
            songCount: 25,
            creator: 'User Name',
          },
          // Add more playlists...
        ],
      };

      setResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { id: 'all', label: t('search.all') },
    { id: 'songs', label: t('search.songs') },
    { id: 'albums', label: t('search.albums') },
    { id: 'artists', label: t('search.artists') },
    { id: 'playlists', label: t('search.playlists') },
  ];

  const renderSongs = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">Album</th>
            <th className="px-4 py-3 font-medium text-right">
              <FiClock className="inline-block w-4 h-4" />
            </th>
          </tr>
        </thead>
        <tbody>
          {results.songs.map((song, index) => {
            const isCurrentSong = currentSong?.id === song.id;
            return (
              <tr
                key={song.id}
                className={`group hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                  isCurrentSong ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
              >
                <td className="px-4 py-3 w-12">
                  <button
                    onClick={() => play(song)}
                    className="p-2 rounded-full bg-primary-500 text-white">
                    {isCurrentSong && isPlaying ? (
                      <span className="block w-4 h-4 bg-primary-500" />
                    ) : (
                      <FiPlay className="w-4 h-4 relative left-[1px]" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded mr-3"
                    />
                    <div>
                      <span
                        className={`font-medium block ${
                          isCurrentSong
                            ? 'text-primary-500'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {song.title}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {song.artist}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                  {song.album}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-right">
                  {formatDuration(song.duration)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAlbums = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {results.albums.map((album) => (
        <Link
          key={album.id}
          to={`/album/${album.id}`}
          className="group"
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
            <img
              src={album.coverUrl}
              alt={album.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center">
                <FiPlay className="h-6 w-6 relative left-[1px]" />
              </button>
            </div>
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {album.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {album.artist} • {album.year}
          </p>
        </Link>
      ))}
    </div>
  );

  const renderArtists = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {results.artists.map((artist) => (
        <Link
          key={artist.id}
          to={`/artist/${artist.id}`}
          className="group text-center"
        >
          <div className="relative aspect-square rounded-full overflow-hidden mb-2">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {artist.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {artist.followers} followers
          </p>
        </Link>
      ))}
    </div>
  );

  const renderPlaylists = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {results.playlists.map((playlist) => (
        <Link
          key={playlist.id}
          to={`/playlist/${playlist.id}`}
          className="group"
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
            <img
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center">
                <FiPlay className="h-6 w-6 relative left-[1px]" />
              </button>
            </div>
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {playlist.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By {playlist.creator} • {playlist.songCount} songs
          </p>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="p-8">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder={t('search.placeholder')}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : searchQuery ? (
        <div className="space-y-8">
          {(activeTab === 'all' || activeTab === 'songs') && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('search.songs')}
              </h2>
              {renderSongs()}
            </section>
          )}
          {(activeTab === 'all' || activeTab === 'albums') && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('search.albums')}
              </h2>
              {renderAlbums()}
            </section>
          )}
          {(activeTab === 'all' || activeTab === 'artists') && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('search.artists')}
              </h2>
              {renderArtists()}
            </section>
          )}
          {(activeTab === 'all' || activeTab === 'playlists') && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('search.playlists')}
              </h2>
              {renderPlaylists()}
            </section>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          
        </div>
      )}
    </div>
  );
};

export default Search; 