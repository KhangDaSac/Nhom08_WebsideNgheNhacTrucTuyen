import { FiPlay } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../../../contexts/PlayerContext';


const Song = ({ song }) => {
    const { t } = useTranslation();
    const { currentSong, playSong } = usePlayer();
    const isCurrentSong = currentSong && currentSong._id === song._id;
    return (
        <>
            <tr
                key={song.id}
                className={`group hover:bg-gray-50 dark:hover:bg-gray-700/50 
                    ${isCurrentSong ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' : ''
                    }`}
            >
                <td className="px-4 py-3 w-16">
                    <button
                        onClick={() => playSong(song)}
                        className="p-2 rounded-full bg-primary-500 text-white flex items-center justify-center w-8 h-8"
                    >
                        <FiPlay className="w-4 h-4 relative left-[1px]" />
                    </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img
                      src={song.image_url}
                      alt={song.song_name}
                      className="w-10 h-10 rounded mr-3"
                    />
                    <div>
                      <span
                        className={`font-medium block ${
                          isCurrentSong
                            ? 'text-primary-500'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {song.song_name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {song.artists.map(artist => artist.artist_name).join(', ')}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell truncate">
                    {song.album.album_name}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    {song.plays}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-right w-20">
                    {formatDuration(song.duration)}
                </td>
            </tr>
        </>
    )
};

export default Song;