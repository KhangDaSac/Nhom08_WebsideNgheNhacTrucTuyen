import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlay } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { FaPlay } from "react-icons/fa6";

const ArtistCard = ({ artist }) => {
    const { t } = useTranslation();
    const formatNumber = (number) => {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
    }
    return (
        <Link
            key={artist._id}
            to={`/artist/${artist._id}`}
            className="group text-center"
        >
            <div className="relative aspect-square rounded-full overflow-hidden mb-3">
                <img
                    src={artist.image_url}
                    alt={artist.artist_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center">
                        <FaPlay className="w-6 h-6 relative left-[1.5px]" />
                    </button>
                </div>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">
                {artist.artist_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(artist.followers)} {t('collection.artist.followers')}
            </p>
        </Link>
    );
}

export default ArtistCard;
