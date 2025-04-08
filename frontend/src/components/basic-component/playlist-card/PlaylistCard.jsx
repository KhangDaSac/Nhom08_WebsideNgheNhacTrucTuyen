import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';

const PlaylistCard = ({ playlist, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(playlist.id);
        }
        setShowMenu(false);
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowMenu(!showMenu);
    };

    return (
        <div
            key={playlist._id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <Link to={`/playlist/${playlist._id}`}>
                <div className="relative aspect-square">
                    <img
                        src={playlist.image_url}
                        alt={playlist.playlist_name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                        <button
                            className="p-3 bg-primary-500 rounded-full text-white"
                        >
                            <FaPlay className="w-6 h-6 relative left-[1.5px]" />
                        </button>
                    </div>
                </div>
            </Link>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <Link
                        to={`/playlist/${playlist._id}`}
                        className="text-md font-semibold text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400"
                    >
                        <p className='break-words'>
                            {playlist.playlist_name}
                        </p>
                    </Link>
                    <div className="relative" ref={menuRef}>
                        <button 
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            onClick={toggleMenu}
                        >
                            <FiMoreVertical className="h-5 w-5" />
                        </button>
                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaylistCard;
