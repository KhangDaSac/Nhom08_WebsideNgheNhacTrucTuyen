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
    <div>
      {/* Artist Header */}
      <div className="relative">
        <div className="h-64 md:h-80 overflow-hidden">
          <img
            src={artist.coverUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-end gap-8">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800"
            />
            <div className="flex-1 text-white mb-4">
              <h1 className="text-5xl font-bold mb-2">{artist.name}</h1>
              <div className="flex items-center text-sm space-x-4">
                <span>{artist.monthlyListeners} monthly listeners</span>
                <span>•</span>
                <span>{artist.followers} followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => play(artist.popularSongs[0])}
            className="flex items-center px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            <FiPlay className="w-5 h-5 mr-2" />
            {t('common.play')}
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2 rounded-full border ${
              isFollowing
                ? 'border-primary-500 text-primary-500'
                : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {isFollowing ? t('artist.following') : t('artist.follow')}
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
            <FiShare2 className="w-6 h-6" />
          </button>
        </div>

        {/* Popular Songs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('artist.popularSongs')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 font-medium">#</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Album</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Plays</th>
                  <th className="px-4 py-3 font-medium text-right">
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
                        <span
                          className={`font-medium ${
                            isCurrentSong
                              ? 'text-primary-500'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {song.title}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                        {song.album}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                        {song.plays}
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
        </div>

        {/* Albums */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('artist.albums')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {artist.albums.map((album) => (
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
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Play album
                      }}
                      className="p-3 bg-primary-500 rounded-full text-white"
                    >
                      <FiPlay className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {album.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {album.releaseYear} • {album.songCount} songs
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('artist.about')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {artist.biography}
            </p>
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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