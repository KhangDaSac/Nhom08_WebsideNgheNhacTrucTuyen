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
    <div className="p-8">
      {/* Album Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-8 mb-8">
        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-48 h-48 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {t('album.album')}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {album.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link
              to={`/artist/${album.artistId}`}
              className="font-medium hover:text-primary-500"
            >
              {album.artist}
            </Link>
            <span className="mx-2">•</span>
            <span>{album.releaseYear}</span>
            <span className="mx-2">•</span>
            <span>{album.songs.length} songs,</span>
            <span className="ml-1">{getTotalDuration()}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => play(album.songs[0])}
              className="flex items-center px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              <FiPlay className="w-5 h-5 mr-2" />
              {t('common.play')}
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full ${
                isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <FiHeart className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <FiShare2 className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <FiMoreHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Artist</th>
              <th className="px-4 py-3 font-medium text-right">
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
                  <td className="px-4 py-3 w-12">
                    <button
                      onClick={() => play(song)}
                      className="p-2 rounded-full group-hover:bg-primary-500 group-hover:text-white"
                    >
                      {isCurrentSong && isPlaying ? (
                        <span className="block w-4 h-4 bg-primary-500" />
                      ) : (
                        <FiPlay className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span
                        className={`font-medium ${
                          isCurrentSong
                            ? 'text-primary-500'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {song.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    {song.artist}
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

      {/* Album Info */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('album.about')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{album.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t('album.genre')}
            </h3>
            <p className="mt-1 text-gray-900 dark:text-white">{album.genre}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t('album.releaseDate')}
            </h3>
            <p className="mt-1 text-gray-900 dark:text-white">
              {album.releaseYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album; 