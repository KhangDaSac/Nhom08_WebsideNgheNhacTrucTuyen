import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiPlay, FiHeart, FiShare2, FiMoreHorizontal, FiClock } from 'react-icons/fi';

const Album = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { play, currentSong, isPlaying } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        // In a real app, this would be an API call
        const data = {
          id: parseInt(id),
          title: 'Album Title',
          artist: 'Artist Name',
          releaseYear: 2024,
          genre: 'Pop',
          coverUrl: 'https://picsum.photos/400',
          description: 'Album description goes here...',
          songs: [
            {
              id: 1,
              title: 'Song 1',
              artist: 'Artist Name',
              duration: 180,
              trackNumber: 1,
            },
            {
              id: 2,
              title: 'Song 2',
              artist: 'Artist Name',
              duration: 210,
              trackNumber: 2,
            },
            // Add more songs...
          ],
        };

        setAlbum(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching album:', error);
        setError('Failed to load album');
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    if (!album?.songs) return '0:00';
    const totalSeconds = album.songs.reduce((acc, song) => acc + song.duration, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
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
            to="/albums"
            className="text-primary-500 hover:text-primary-600"
          >
            {t('common.backToAlbums')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Album Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        <div className="w-48 sm:w-48 md:w-56 shrink-0">
          <img
            src={album.coverUrl}
            alt={album.title}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 w-full text-center sm:text-left">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {t('album.album')}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {album.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start text-sm text-gray-500 dark:text-gray-400 mb-4 gap-2">
            <Link
              to={`/artist/${album.artistId}`}
              className="font-medium hover:text-primary-500"
            >
              {album.artist}
            </Link>
            <span className="hidden sm:inline mx-2">•</span>
            <span>{album.releaseYear}</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span>{album.songs.length} songs,</span>
            <span className="ml-1">{getTotalDuration()}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => play(album.songs[0])}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors text-sm sm:text-base"
            >
              <FiPlay className="w-4 sm:w-5 h-4 sm:h-5 relative left-[1px]" />
              {t('Play')}
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full ${
                isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <FiHeart className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <FiShare2 className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <FiMoreHorizontal className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm -mx-4 sm:mx-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 font-medium w-16">#</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Artist</th>
                <th className="px-4 py-3 font-medium text-right w-20">
                  <FiClock className="inline-block w-4 h-4" />
                </th>
              </tr>
            </thead>
            <tbody>
              {album.songs.map((song) => {
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
                      <div className="flex flex-col">
                        <span
                          className={`font-medium truncate ${
                            isCurrentSong
                              ? 'text-primary-500'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {song.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell truncate">
                      {song.artist}
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

      {/* Album Info */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('About album')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{album.description}</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {t('Genre')}
            </h3>
            <p className="text-gray-900 dark:text-white">{album.genre}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {t('Release date')}
            </h3>
            <p className="text-gray-900 dark:text-white">
              {album.releaseYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album; 