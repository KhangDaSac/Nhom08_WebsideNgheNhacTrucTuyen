import React, { useState } from 'react';
import PlaylistCard from './PlaylistCard';


const PlaylistCards = ({ playlists }) => {
    const [currentPage, setCurrentPage] = useState(1);
    

    const itemsPerPage = 5;
    const totalPages = Math.ceil(playlists.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlaylists = playlists.slice(indexOfFirstItem, indexOfLastItem);
    

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {currentPlaylists.map((playlist) => (
                    <PlaylistCard key={playlist._id} playlist={playlist}></PlaylistCard>
                ))}
            </div>
            
            {playlists.length > itemsPerPage && (
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

export default PlaylistCards;
