import React, { useState } from 'react';
import SongCard from './SongCard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const SongCards = ({ songs, collectionTitle, viewAll, isAddToPlaylist }) => {
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
                {currentSongs.map((song) => {
                    return <SongCard key={song._id} song={song} isAddToPlaylist={isAddToPlaylist}/>
                })}
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

export default SongCards;
