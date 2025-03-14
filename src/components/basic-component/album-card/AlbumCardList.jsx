import React from 'react';
import { useTranslation } from 'react-i18next'; 
import AlbumCard from './AlbumCard';
const AlbumCardList = ({ albumList }) => {
    const { t } = useTranslation();
    return (
        <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('Albums')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {albumList.map((album) => {
                    return <AlbumCard key={album.id} album={album} />
                }
            )}
            </div>
        </>
    );
}

export default AlbumCardList;
