import React, { useState, useEffect } from 'react';
import Song from './Song';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Songs = ({ songs, removeSong }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(5);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [songs]);
    
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    const totalPages = Math.ceil(songs.length / songsPerPage);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    /*
    "image": "Image",
    "songName": "Song Name",
    "artistName": "Artist Name",
    "genre": "Genre",
    "releaseDate": "Release Date",
    "view": "View",
    "like": "Like",
    "audio": "Audio",
    "actions": "Actions",
     */
    return (
        <div>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.image')}</th>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.songName')}</th>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.artistName')}</th>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.genre')}</th>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.releaseDate')}</th>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.view')}</th>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.like')}</th>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.audio')}</th>
                            <th className="p-3 border-b dark:border-gray-600">{t('songManager.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {currentSongs.length > 0 ? (
                            currentSongs.map((song) => (
                                <Song key={song._id} song={song} removeSong={removeSong}/>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    No songs available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-4 rounded-lg shadow">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                                currentPage === 1 
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                                currentPage === totalPages 
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                                        currentPage === 1 
                                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            currentPage === index + 1
                                                ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-700 text-blue-600 dark:text-blue-300'
                                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                                        currentPage === totalPages 
                                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Songs;
