import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import {
  FiPlay,
  FiHeart,
  FiClock,
  FiMusic,
  FiTrendingUp,
  FiStar,
} from 'react-icons/fi';

const Home = () => {
  const { t } = useTranslation();
  const { play, currentSong, isPlaying } = usePlayer();
  const [isLoading, setIsLoading] = useState(true);
  const [recentSongs, setRecentSongs] = useState([]);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls
        const songs = [
          {
            id: 1,
            title: 'Song Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            duration: 180,
          },
          // Add more songs...
        ];

        const albums = [
          {
            id: 1,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/300',
            year: 2024,
          },
          // Add more albums...
        ];

        const artists = [
          {
            id: 1,
            name: 'Artist Name 1',
            imageUrl: 'https://picsum.photos/200',
            followers: '1.2M',
          },
          // Add more artists...
        ];

        setRecentSongs(songs);
        setFeaturedAlbums(albums);
        setPopularArtists(artists);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/1920/1080"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {t('Welcome music for you')}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              {t('Âm nhạc kết nối mọi người')}
            </p>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Recent Songs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('Songs')}
            </h2>
            <Link
              to="/songs"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              {t('View all')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSongs.map((song) => {
              const isCurrentSong = currentSong?.id === song.id;
              return (
                <div
                  key={song.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => play(song)}
                        className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center"
                      >
                        {isCurrentSong && isPlaying ? (
                          <span className="block w-6 h-6 bg-white rounded-full" />
                        ) : (
                          <FiPlay className="w-6 h-6 relative left-[1px]" />
                        )}
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {song.artist}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiClock className="w-4 h-4" />
                    <span>{formatDuration(song.duration)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Albums */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('Albums')}
            </h2>
            <Link
              to="/albums"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              {t('View all')}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {featuredAlbums.map((album) => (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                className="group"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <img
                    src={album.coverUrl}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center">
                      <FiPlay className="w-6 h-6 relative left-[1px]" />
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
        </section>

        {/* Popular Artists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('home.popularArtists')}
            </h2>
            <Link
              to="/artists"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              {t('View all')}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {popularArtists.map((artist) => (
              <Link
                key={artist.id}
                to={`/artist/${artist.id}`}
                className="group text-center"
              >
                <div className="relative aspect-square rounded-full overflow-hidden mb-3">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center">
                      <FiPlay className="w-6 h-6 relative left-[1px]" />
                    </button>
                  </div>
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
        </section>
      </div>
    </div>
  );
};

export default Home; 