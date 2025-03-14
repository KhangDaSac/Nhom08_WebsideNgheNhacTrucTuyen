import React from 'react';
import Song from './Song';
import { FiClock } from 'react-icons/fi';
const SongList = ({ artist, currentSong, play, formatDuration }) => {
    return (
        <table className="w-full min-w-[640px]">
            <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 font-medium w-16">#</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Album</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Plays</th>
                    <th className="px-4 py-3 font-medium text-right w-20">
                        <FiClock className="inline-block w-4 h-4" />
                    </th>
                </tr>
            </thead>
            <tbody>
                {artist.popularSongs.map((song, index) => {
                    const isCurrentSong = currentSong?.id === song.id;
                    return (
                        <Song
                            key={song.id}
                            song={song}
                            isCurrentSong={isCurrentSong}
                            play={play}
                            formatDuration={formatDuration}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}

export default SongList;
