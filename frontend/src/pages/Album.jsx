import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiPlay, FiHeart, FiShare2, FiMoreHorizontal, FiClock } from 'react-icons/fi';
import axios from 'axios';
import Songs from '../components/basic-component/song/Songs';
import { format } from 'date-fns';
import { FaPlay } from "react-icons/fa6";

const Album = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { playSong, currentSong, formatDuration } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAlbum();
        await fetchSongs();
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [id]);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/albums/${id}`);
      setAlbum(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/songs/album=${id}`);
      setSongs(response.data.data);
    } catch (error) {
      setError(error.message);
    }
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
            src={album.image_url}
            alt={album.album_name}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 w-full text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {album.album_name}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start text-sm text-gray-500 dark:text-gray-400 mb-4 gap-2">
            {album.artists.map((artist) => (
              <Link
                to={`/artist/${artist._id}`}
                className="font-medium hover:text-primary-500"
              >
                {artist.artist_name}
              </Link>
            ))}
            <span className="hidden sm:inline mx-2">•</span>
            <span>{format(album.release_date, 'yyyy')}</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span>{album?.songs.length} songs</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => playSong(songs[0])}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors text-sm sm:text-base"
            >
              <FaPlay className="w-4 sm:w-5 h-4 sm:h-5 relative left-[1px]" />
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
      <div>
        <Songs songs={songs} collectionTitle={'collection.song.songs'} />
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
            <p className="text-gray-900 dark:text-white">{album.genres.join(', ') }</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {t('Release date')}
            </h3>
            <p className="text-gray-900 dark:text-white">
              {format(album.release_date, 'dd-MM-yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album; 