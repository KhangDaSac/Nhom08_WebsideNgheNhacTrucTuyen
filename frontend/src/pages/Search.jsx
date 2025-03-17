import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiSearch, FiPlay, FiClock } from 'react-icons/fi';
import Songs from '../components/basic-component/song/Songs';
import AlbumCards from '../components/basic-component/album-card/AlbumCards.jsx';
import ArtistCards from '../components/basic-component/artist-card/ArtistCards.jsx';
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
    { id: 'artists', label: t('search.artists') }
  ];

  const renderSongs = () => (
    <Songs songs={results.songs} collectionTitle={t('collection.song.songs')} currentSong={currentSong} play={play} formatDuration={formatDuration} />
  );

  const renderAlbums = () => (
    <AlbumCards albums={results.albums} collectionTitle={t('collection.album.albums')} />
  );

  const renderArtists = () => (
    <ArtistCards artists={results.artists} collectionTitle={t('collection.artist.artists')} />
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
              {renderSongs()}
            </section>
          )}
          {(activeTab === 'all' || activeTab === 'albums') && (
            <section>
              {renderAlbums()}
            </section>
          )}
          {(activeTab === 'all' || activeTab === 'artists') && (
            <section>
              {renderArtists()}
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