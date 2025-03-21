import React from 'react';
import { useTranslation } from 'react-i18next';
import AlbumCard from './AlbumCard';
const AlbumCards = ({ albums, collectionTitle, viewAll }) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t(collectionTitle)}
                </h2>
                {
                    viewAll &&
                    <Link
                        to="/albums"
                        className="text-primary-500 hover:text-primary-600 font-medium"
                    >
                        {t('collection.viewAll')}
                    </Link>
                }
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {albums.map((album) => {
                    return <AlbumCard key={album._id} album={album} />
                }
                )}
            </div>
        </>
    );
}

export default AlbumCards;
