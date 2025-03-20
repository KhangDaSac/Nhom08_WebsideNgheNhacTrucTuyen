import React from 'react';
import Song from './Song';
import { FiClock } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Songs = ({ songs, collectionTitle}) => {
    const { t } = useTranslation();
    return (
        <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t(collectionTitle)}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm -mx-4 sm:mx-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                <th className="px-4 py-3 font-medium w-16">#</th>
                                <th className="px-4 py-3 font-medium">{t('collection.song.title')}</th>
                                <th className="px-4 py-3 font-medium hidden md:table-cell">{t('collection.song.album')}</th>
                                <th className="px-4 py-3 font-medium hidden md:table-cell">{t('collection.song.plays')}</th>
                                <th className="px-4 py-3 font-medium text-right w-20">
                                    <FiClock className="inline-block w-4 h-4" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song) => {
                                return (
                                    <Song
                                        key={song._id}
                                        song={song}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Songs;
