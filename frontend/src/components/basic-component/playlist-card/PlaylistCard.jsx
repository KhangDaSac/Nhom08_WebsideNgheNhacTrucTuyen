import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiMoreVertical } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';

const PlaylistCard = ({ playlist }) => {
    return (
        <div
            key={playlist.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <Link to={`/playlist/${playlist.id}`}>
                <div className="relative aspect-square">
                    <img
                        src={playlist.image_url}
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                        <button
                            className="p-3 bg-primary-500 rounded-full text-white"
                        >
                            <FaPlay className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </Link>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <Link
                        to={`/playlist/${playlist.id}`}
                        className="text-md font-semibold text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400"
                    >
                        <p className='break-words'>
                            {playlist.playlist_name}
                        </p>
                    </Link>
                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <FiMoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlaylistCard;
