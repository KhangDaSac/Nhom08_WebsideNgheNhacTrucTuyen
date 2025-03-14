import React from 'react';
import { Link } from 'react-router-dom';    
import { FiPlay } from 'react-icons/fi';

const AlbumCard = ({ album }) => {
    return (
        <Link
            key={album.id}
            to={`/album/${album.id}`}
            className="group"
        >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100 dark:bg-gray-800">
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
                        className="p-2 sm:p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center"
                    >
                        <FiPlay className="h-4 sm:h-5 w-4 sm:w-5 relative left-[1px]" />
                    </button>
                </div>
            </div>
            <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                {album.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {album.releaseYear} • {album.songCount} songs
            </p>
        </Link>
    );
}

export default AlbumCard;
