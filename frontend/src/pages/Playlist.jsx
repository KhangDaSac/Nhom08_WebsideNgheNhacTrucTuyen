import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiHeart, FiShare2, FiMoreHorizontal } from 'react-icons/fi';
import { FaPlay } from "react-icons/fa6";
import Songs from '../components/basic-component/song/Songs';
import axios from 'axios';
import { format } from 'date-fns';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { useLibrary } from '../contexts/LibraryContext';

const Playlist = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { playSong, currentSong } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deletePlaylist } = useLibrary();

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

  const handleDeletePlaylist = async () => {
    deletePlaylist(id);
    navigate('/playlists');
  }

  const confirmDeletePlaylist = () => {
    setShowDeleteModal(true);
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
            <span className="hidden sm:inline mx-2"></span>
            <span>{t('playlist.createdOn')}: {format(new Date(playlist.created_date), 'dd-MM-yyyy')}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={playAllSongs}
              className="px-4 py-3 gap-3 rounded-xl text-sm text-primary-100 bg-primary-600 dark:text-primary-100 hover:bg-primary-400 dark:hover:bg-primary-500 flex items-center"
            >
              <FaPlay className="w-4 sm:w-5 h-4 sm:h-5 relative left-[1px]" />
              {t('playlist.play')}
            </button>
            <button
              className="px-4 py-3 gap-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              onClick={confirmDeletePlaylist}
            >
              <FiTrash2 className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Songs List */}
      {songs.length > 0 ? (
        <div>
          <Songs
            songs={songs}
            collectionTitle="playlist.songs"
            isRemove
            playlist={playlist}
            fetchSongs={fetchSongs} />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">{t('playlist.noSongs')}</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title={t('playlist.confirmDelete')}
        message={t('playlist.deleteWarning', { name: playlist?.playlist_name })}
        confirmText={t('playlist.delete')}
        cancelText={t('playlist.cancel')}
        onConfirm={() => {
          setShowDeleteModal(false);
          handleDeletePlaylist();
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default Playlist;
