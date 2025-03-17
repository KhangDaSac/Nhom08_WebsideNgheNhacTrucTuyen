import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiPlay, FiHeart, FiShare2, FiClock, FiMusic } from 'react-icons/fi';
import Songs from '../components/basic-component/song/Songs';
import AlbumCards from '../components/basic-component/album-card/AlbumCards.jsx';

const Artist = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { play, currentSong, isPlaying } = usePlayer();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        // In a real app, this would be an API call
        const data = {
          id: parseInt(id),
          name: 'Artist Name',
          imageUrl: 'https://picsum.photos/400',
          coverUrl: 'https://picsum.photos/1200/400',
          monthlyListeners: '2.5M',
          followers: '1.2M',
          biography: 'Artist biography and description goes here...',
          genres: ['Pop', 'R&B', 'Soul'],
          popularSongs: [
            {
              id: 1,
              title: 'Popular Song 1',
              album: 'Album 1',
              plays: '1.5M',
              duration: 180,
              coverUrl: 'https://picsum.photos/100',
            },
            {
              id: 2,
              title: 'Popular Song 2',
              album: 'Album 2',
              plays: '1.2M',
              duration: 210,
              coverUrl: 'https://picsum.photos/100',
            },
            // Add more songs...
          ],
          albums: [
            {
              id: 1,
              title: 'Album 1',
              coverUrl: 'https://picsum.photos/200',
              releaseYear: 2024,
              songCount: 12,
            },
            {
              id: 2,
              title: 'Album 2',
              coverUrl: 'https://picsum.photos/201',
              releaseYear: 2023,
              songCount: 10,
            },
            // Add more albums...
          ],
        };

        setArtist(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artist:', error);
        setError('Failed to load artist');
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <Link
            to="/artists"
            className="text-primary-500 hover:text-primary-600"
          >
            {t('common.backToArtists')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Artist Header */}
      <div className="relative">
        <div className="h-40 sm:h-56 md:h-72 overflow-hidden">
          <img
            src={artist.coverUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4 sm:gap-6 md:gap-8">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
                {artist.name}
              </h1>
              <div className="flex flex-col sm:flex-row items-center text-sm sm:text-base space-y-1 sm:space-y-0 sm:space-x-4 text-gray-300">
                <span>{artist.monthlyListeners} monthly listeners</span>
                <span className="hidden sm:inline">•</span>
                <span>{artist.followers} followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
          <button
            onClick={() => play(artist.popularSongs[0])}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors text-sm sm:text-base"
          >
            <FiPlay className="w-4 sm:w-5 h-4 sm:h-5 relative left-[1px]" />
            {t('artist.play')}
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-4 sm:px-6 py-2 rounded-full border text-sm sm:text-base ${
              isFollowing
                ? 'border-primary-500 text-primary-500'
                : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {isFollowing ? t('artist.unfollow') : t('artist.follow')}
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
            <FiShare2 className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
        </div>

        {/* Popular Songs */}
        <div>
            <Songs songs={artist.popularSongs} collectionTitle={'collection.song.popularSongs'} currentSong={currentSong} play={play} formatDuration={formatDuration} />
        </div>

        {/* Albums */}
        <div>
            <AlbumCards albums={artist.albums} />
        </div>

        {/* About */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('artist.about')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-4 sm:line-clamp-none">
              {artist.biography}
            </p>
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist; 