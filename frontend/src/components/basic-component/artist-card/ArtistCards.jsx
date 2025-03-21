import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArtistCard from './ArtistCard';

const ArtistCards = ({ artists, collectionTitle, viewAll }) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t(collectionTitle)}
                </h2>
                {
                    viewAll &&
                    <Link
                        to="/artists"
                        className="text-primary-500 hover:text-primary-600 font-medium"
                    >
                        {t('collection.viewAll')}
                    </Link>
                }
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {artists.map((artist) => (
                    <ArtistCard key={artist._id} artist={artist} />
                ))}
            </div>
        </>
    );
}

export default ArtistCards;
