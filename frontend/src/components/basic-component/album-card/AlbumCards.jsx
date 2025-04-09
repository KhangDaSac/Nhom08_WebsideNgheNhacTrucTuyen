import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AlbumCard from './AlbumCard';

const AlbumCards = ({ albums, collectionTitle, viewAll }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    

    const itemsPerPage = 4;
    const totalPages = Math.ceil(albums.length / itemsPerPage);
    const indexOfLastAlbum = currentPage * itemsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - itemsPerPage;
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
    

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
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
                {currentAlbums.map((album) => {
                    return <AlbumCard key={album._id} album={album} />
                }
                )}
            </div>
            

            {albums.length > itemsPerPage && (
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

export default AlbumCards;
