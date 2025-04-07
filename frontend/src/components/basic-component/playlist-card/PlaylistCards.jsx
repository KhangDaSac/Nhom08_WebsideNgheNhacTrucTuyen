import React from 'react';
import PlaylistCard from './PlaylistCard';


const PlaylistCards = ({ playlists }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist}></PlaylistCard>
            ))}
        </div>
    );
}

export default PlaylistCards;
