import React from 'react';
import { usePlayer } from '../../../contexts/PlayerContext';
import { FaPlay } from "react-icons/fa6";
import { FaCompactDisc } from "react-icons/fa";

const SongCard = ({ song }) => {
    const { currentSong, isPlaying, playSong, setIsPlaying } = usePlayer();
    const isCurrentSong = currentSong?._id === song._id;

    return (
        <>
            <div
                key={song._id}
                className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                        src={song.image_url}
                        alt={song.song_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            onClick={() => {
                                if (isCurrentSong) {
                                    setIsPlaying(!isPlaying);
                                } else {
                                    playSong(song);
                                }
                            }}
                            className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center"
                        >
                            {isCurrentSong && isPlaying
                                ? <FaCompactDisc className="w-6 h-6 spin-animation" />
                                : <FaPlay className="w-6 h-6 relative left-[1.5px]" />}
                        </button>
                    </div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {song.song_name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {song.artists?.map(artist => artist.artist_name).join(', ')}
                </p>
            </div>
        </>
    );
}

export default SongCard;
