import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiPlay, FiHeart, FiShare2, FiClock, FiMusic } from 'react-icons/fi';

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
            },
            {
              id: 2,
              title: 'Popular Song 2',
              album: 'Album 2',
              plays: '1.2M',
              duration: 210,
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
            {t('Play')}
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-4 sm:px-6 py-2 rounded-full border text-sm sm:text-base ${
              isFollowing
                ? 'border-primary-500 text-primary-500'
                : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {isFollowing ? t('Unfollow') : t('Follow')}
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
            <FiShare2 className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
        </div>

        {/* Popular Songs */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('Popular songs')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm -mx-4 sm:mx-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 font-medium w-16">#</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Album</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Plays</th>
                    <th className="px-4 py-3 font-medium text-right w-20">
                      <FiClock className="inline-block w-4 h-4" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {artist.popularSongs.map((song, index) => {
                    const isCurrentSong = currentSong?.id === song.id;
                    return (
                      <tr
                        key={song.id}
                        className={`group hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          isCurrentSong ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                        }`}
                      >
                        <td className="px-4 py-3 w-16">
                          <button
                            onClick={() => play(song)}
                            className="p-2 rounded-full bg-primary-500 text-white flex items-center justify-center w-8 h-8"
                          >
                            <FiPlay className="w-4 h-4 relative left-[1px]" />
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`font-medium truncate ${
                              isCurrentSong
                                ? 'text-primary-500'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {song.title}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell truncate">
                          {song.album}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                          {song.plays}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-right w-20">
                          {formatDuration(song.duration)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Albums */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('Albums')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {artist.albums.map((album) => (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={album.coverUrl}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Play album
                      }}
                      className="p-2 sm:p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center"
                    >
                      <FiPlay className="h-4 sm:h-5 w-4 sm:w-5 relative left-[1px]" />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {album.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {album.releaseYear} • {album.songCount} songs
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('About artist')}
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