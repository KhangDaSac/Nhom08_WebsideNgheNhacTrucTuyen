import React from 'react';
import { FiPlay, FiClock } from 'react-icons/fi';

const SongCard = ({ song, currentSong, play, formatDuration }) => {
    const isCurrentSong = currentSong?.id === song.id;

    return (
        <>
            <div
                key={song.id}
                className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            onClick={() => play(song)}
                            className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center"
                        >
                            {isCurrentSong && isPlaying ? (
                                <span className="block w-6 h-6 bg-white rounded-full" />
                            ) : (
                                <FiPlay className="w-6 h-6 relative left-[1px]" />
                            )}
                        </button>
                    </div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {song.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {song.artist}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiClock className="w-4 h-4" />
                    <span>{formatDuration(song.duration)}</span>
                </div>
            </div>
        </>
    );
}

export default SongCard;
