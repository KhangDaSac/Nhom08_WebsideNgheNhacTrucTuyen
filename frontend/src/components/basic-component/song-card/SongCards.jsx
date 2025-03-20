import React from 'react';
import SongCard from './SongCard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SongCards = ({ songs, collectionTitle, currentSong, play, formatDuration, viewAll }) => {
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
                        to="/songs"
                        className="text-primary-500 hover:text-primary-600 font-medium"
                    >
                        {t('collection.viewAll')}
                    </Link>
                }
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {songs.map((song) => {
                    return <SongCard key={song._id} song={song}/>
                })}
            </div>
        </>
    );
}

export default SongCards;
