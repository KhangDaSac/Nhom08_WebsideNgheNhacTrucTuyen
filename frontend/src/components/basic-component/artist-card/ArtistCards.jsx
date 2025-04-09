import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArtistCard from './ArtistCard';

const ArtistCards = ({ artists, collectionTitle, viewAll }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    

    const itemsPerPage = 4;
    const totalPages = Math.ceil(artists.length / itemsPerPage);
    const indexOfLastArtist = currentPage * itemsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - itemsPerPage;
    const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);
    

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
                        to="/artists"
                        className="text-primary-500 hover:text-primary-600 font-medium"
                    >
                        {t('collection.viewAll')}
                    </Link>
                }
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {currentArtists.map((artist) => (
                    <ArtistCard key={artist._id} artist={artist} />
                ))}
            </div>
            

            {artists.length > itemsPerPage && (
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

export default ArtistCards;
