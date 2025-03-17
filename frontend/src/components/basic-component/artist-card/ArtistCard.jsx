import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlay } from 'react-icons/fi';

const ArtistCard = ({ artist }) => {
    return (
        <Link
            key={artist.id}
            to={`/artist/${artist.id}`}
            className="group text-center"
        >
            <div className="relative aspect-square rounded-full overflow-hidden mb-3">
                <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center">
                        <FiPlay className="w-6 h-6 relative left-[1px]" />
                    </button>
                </div>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">
                {artist.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {artist.followers} followers
            </p>
        </Link>
    );
}

export default ArtistCard;
