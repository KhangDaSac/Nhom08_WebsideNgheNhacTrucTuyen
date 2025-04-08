import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from '../../../contexts/PlayerContext';
import { FaPlay } from "react-icons/fa6";
import { FaCompactDisc } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import axios from 'axios';
import { useLibrary } from '../../../contexts/LibraryContext';

const SongCard = ({ song }) => {
    const { currentSong, isPlaying, playSong, setIsPlaying } = usePlayer();
    const isCurrentSong = currentSong?._id === song._id;
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
    const menuRef = useRef(null);
    const { playlists, addToPlaylist, fetchPlaylists } = useLibrary();

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

    useEffect(() => {
        if (showPlaylistMenu) {
            fetchPlaylists();
        }
    }, [showPlaylistMenu]);


    const togglePlaylistMenu = (e) => {
        e.stopPropagation();
        setShowPlaylistMenu(!showPlaylistMenu);
    };

    return (
        <>
            <div
                key={song._id}
                className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                        src={song.image_url}
                        alt={song.song_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    if (isCurrentSong) {
                                        setIsPlaying(!isPlaying);
                                    } else {
                                        playSong(song);
                                    }
                                }}
                                className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center"
                            >
                                {isCurrentSong && isPlaying
                                    ? <FaCompactDisc className="w-6 h-6 spin-animation" />
                                    : <FaPlay className="w-6 h-6 relative left-[1.5px]" />}
                            </button>

                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                            {song.song_name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {song.artists?.map(artist => artist.artist_name).join(', ')}
                        </p>
                    </div>
                    <div className="relative mx-2">
                        <button
                            onClick={togglePlaylistMenu}
                            className=""
                        >
                            <FiPlus className="w-6 h-6" />
                        </button>

                        {showPlaylistMenu && (
                            <div
                                ref={menuRef}
                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-1"
                                style={{ bottom: '100%', marginBottom: '10px' }}
                            >
                                {playlists.length > 0 ? (
                                    playlists.map(playlist => (
                                        <button
                                            key={playlist._id}
                                            onClick={() => addToPlaylist(playlist._id, song._id)}
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
                </div>
            </div>
        </>
    );
}

export default SongCard;
