import React from 'react';
import { useTranslation } from 'react-i18next'; 
import AlbumCard from './AlbumCard';
const AlbumCardList = ({ artist }) => {
    const { t } = useTranslation();
    return (
        <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('Albums')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {artist.albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
            ))}
            </div>
        </>
    );
}

export default AlbumCardList;
