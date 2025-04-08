import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiHeart, FiShare2, FiClock, FiMusic, FiPlus } from 'react-icons/fi';
import { FaPlay, FaHeart } from "react-icons/fa";
import { FaCompactDisc } from "react-icons/fa";
import axios from 'axios';
import { format } from 'date-fns';
import SongCards from '../components/basic-component/song-card/SongCards';
import { useLibrary } from '../contexts/LibraryContext';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';

const Song = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { playSong, currentSong, isPlaying, setIsPlaying } = usePlayer();
    const [song, setSong] = useState(null);
    const [relatedSongs, setRelatedSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
    const menuRef = useRef(null);
    const { userPlaylists, fetchLibrary, addSongToPlaylist, playlists } = useLibrary();
    const { showSuccessToast, showErrorToast } = useToast();
    const { user } = useAuth();

    const isCurrentSong = currentSong?._id === id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchSong();

                setIsLoading(false);
            } catch (error) {
                setError(error.message || 'Failed to load song');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowPlaylistMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const fetchSong = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/songs/${id}`);
            setSong(response.data.data);
            setIsFavorite(response.data.data);
            await fetchRelatedSongs(response.data.data);
        } catch (error) {
            console.error('Error fetching song:', error);
            setError('Failed to load song');
        }
    };



    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const formatNumber = (number) => {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number;
    };

    const handlePlayClick = () => {
        if (isCurrentSong) {
            setIsPlaying(!isPlaying);
        } else {
            playSong(song);
        }
    };

    const handleAddToPlaylist = async ({ song, playlist }) => {
        try {
            const result = await addSongToPlaylist(playlist._id, song._id);
            if (result?.success) {
                showSuccessToast(t('toast.addSong.success', { songName: song.song_name, playlistName: playlist.playlist_name }));
                fetchLibrary();
            } else {
                showErrorToast('toast.addSong.error');
            }

            setShowPlaylistMenu(false);
        } catch (error) {
            console.error('Error adding song to playlist:', error);
            showErrorToast('Error adding song to playlist');
        }
    };

    const togglePlaylistMenu = (e) => {
        e.stopPropagation();
        setShowPlaylistMenu(!showPlaylistMenu);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">

            <div className="flex flex-col lg:flex-row gap-8 mb-8">

                <div className="w-full lg:w-2/5 xl:w-1/3">
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800">
                        <img
                            src={song.image_url}
                            alt={song.song_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full lg:w-3/5 xl:w-2/3">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        {song.song_name}
                    </h1>

                    <div className="flex flex-wrap items-center text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-5 gap-2">
                        {song.artists && song.artists.map((artist, index) => (
                            <React.Fragment key={artist._id}>
                                <Link
                                    to={`/artist/${artist._id}`}
                                    className="font-medium hover:text-primary-500"
                                >
                                    {artist.artist_name}
                                </Link>
                                {index < song.artists.length - 1 && <span>•</span>}
                            </React.Fragment>
                        ))}
                        {song.album_id && (
                            <>
                                <span>•</span>
                                <Link
                                    to={`/album/${song.album_id._id}`}
                                    className="hover:text-primary-500"
                                >
                                    {song.album_id.album_name}
                                </Link>
                            </>
                        )}
                        {song.release_date && (
                            <>
                                <span>•</span>
                                <span>{format(new Date(song.release_date), 'yyyy')}</span>
                            </>
                        )}
                    </div>


                    <div className="flex flex-wrap items-center gap-4 mb-5">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiMusic className="w-5 h-5" />
                            <span>{formatNumber(song.views)} {t('song.plays')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiHeart className="w-5 h-5" />
                            <span>{formatNumber(song.likes)} {t('song.likes')}</span>
                        </div>
                    </div>


                    <div className="flex flex-wrap gap-3 mb-7">
                        <button
                            onClick={handlePlayClick}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
                        >
                            {isCurrentSong && isPlaying
                                ? <><FaCompactDisc className="w-5 h-5 animate-spin" /> {t('song.pause')}</>
                                : <><FaPlay className="w-5 h-5 relative left-0.5" /> {t('song.play')}</>
                            }
                        </button>

                        <button
                            onClick={toggleFavorite}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-colors ${isFavorite
                                ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            {isFavorite ? <FaHeart className="w-5 h-5" /> : <FiHeart className="w-5 h-5" />}
                            {isFavorite ? t('song.liked') : t('song.like')}
                        </button>

                        {user && user?._id && (
                            <div className="relative">
                                <button
                                    onClick={togglePlaylistMenu}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FiPlus className="w-5 h-5" />
                                    {t('song.addToPlaylist')}
                                </button>

                                {showPlaylistMenu && (
                                    <div
                                        ref={menuRef}
                                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-1"
                                    >
                                        {playlists && playlists.length > 0 ? (
                                            playlists.map(playlist => (
                                                <button
                                                    key={playlist._id}
                                                    onClick={() => handleAddToPlaylist({ song, playlist })}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    Add to
                                                    <span className='font-semibold text-gray-900 dark:text-white ms-1'>
                                                        {playlist.playlist_name}
                                                    </span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                No playlists found
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {song.genres && song.genres.length > 0 && (
                        <div className="mb-5">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('song.genres')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {song.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>


            {relatedSongs.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('song.moreLikeThis')}
                    </h2>
                    <SongCards songs={relatedSongs} />
                </div>
            )}
        </div>
    );
};

export default Song;
