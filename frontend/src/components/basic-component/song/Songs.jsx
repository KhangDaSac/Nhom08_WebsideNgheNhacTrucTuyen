import React, { useState } from 'react';
import Song from './Song';
import { FiClock } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import {FiTrash2} from 'react-icons/fi';

const Songs = ({ songs, collectionTitle, isRemove, playlist, removeSong }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    
    // Calculate pagination
    const itemsPerPage = 4;
    const totalPages = Math.ceil(songs.length / itemsPerPage);
    const indexOfLastSong = currentPage * itemsPerPage;
    const indexOfFirstSong = indexOfLastSong - itemsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
    
    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
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
                                <th className="px-4 py-3 font-medium w-16"></th>
                                <th className="px-4 py-3 font-medium">{t('collection.song.title')}</th>
                                <th className="px-4 py-3 font-medium hidden md:table-cell">{t('collection.song.view')}</th>
                                <th className="px-4 py-3 font-medium hidden md:table-cell">{t('collection.song.like')}</th>
                                {isRemove && <th className="px-4 py-3 font-medium hidden md:table-cell">{t('collection.remove')}</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentSongs.map((song) => {
                                return (
                                    <Song
                                        key={song._id || song.song_id}
                                        song={song}
                                        isRemove={isRemove}
                                        playlist={playlist}
                                        removeSong={removeSong}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Pagination */}
            {songs.length > itemsPerPage && (
                <div className="flex justify-center mt-6">
                    <nav className="flex space-x-2" aria-label="Pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === number
                                    ? "bg-primary-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                }`}
                            >
                                {number}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}

export default Songs;
