import React from 'react';
import SongCard from './SongCard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SongCardList = ({ songList, currentSong, play, formatDuration }) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('Songs')}
                </h2>
                <Link
                    to="/songs"
                    className="text-primary-500 hover:text-primary-600 font-medium"
                >
                    {t('View all')}
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {songList.map((song) => {
                    return <SongCard key={song.id} song={song} currentSong={currentSong} play={play} formatDuration={formatDuration} />
                })}
            </div>
        </>
    );
}

export default SongCardList;
