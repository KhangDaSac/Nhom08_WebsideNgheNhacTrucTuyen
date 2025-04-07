import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiHeart, FiShare2, FiMoreHorizontal } from 'react-icons/fi';
import { FaPlay } from "react-icons/fa6";
import Songs from '../components/basic-component/song/Songs';
import axios from 'axios';
import { format } from 'date-fns';

const Playlist = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { playSong, currentSong } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPlaylist();
        await fetchSongs();
        setIsLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to load playlist');
        setIsLoading(false);
      }
    };



    fetchData();
  }, [id]);

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/playlists/${id}`);
      setPlaylist(response.data.data);
    } catch (error) {
      console.error('Error fetching playlist:', error);
      setError('Failed to load playlist');
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/playlists/${id}/songs`);
      setSongs(response.data.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setError('Failed to load songs');
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
            to="/playlists"
            className="text-primary-500 hover:text-primary-600"
          >
            {t('common.backToPlaylists')}
          </Link>
        </div>
      </div>
    );
  }

  const playAllSongs = () => {
    if (songs.length > 0) {
      playSong(songs[0]);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <div className='mb-5'>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t('playlist.title')}
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        <div className="w-48 sm:w-48 md:w-56 shrink-0">
          <img
            src={playlist.image_url}
            alt={playlist.playlist_name}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 w-full text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {playlist.playlist_name}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start text-sm text-gray-500 dark:text-gray-400 mb-4 gap-2">
            <span>{t('playlist.songs')}: {songs.length}</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span>{t('playlist.createdOn')}: {format(new Date(playlist.created_date), 'dd-MM-yyyy')}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={playAllSongs}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors text-sm sm:text-base"
            >
              <FaPlay className="w-4 sm:w-5 h-4 sm:h-5 relative left-[1px]" />
              {t('playlist.play')}
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <FiMoreHorizontal className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Songs List */}
      {console.log(songs)}
      {songs.length > 0 ? (

        <div>
          <Songs songs={songs} collectionTitle="playlist.songs" isRemove/>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">{t('playlist.noSongs')}</p>
        </div>
      )}
    </div>
  );
};

export default Playlist;
