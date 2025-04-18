import { FiPlay } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../../../contexts/PlayerContext';
import { FaPlay } from "react-icons/fa6";
import { FaCompactDisc } from "react-icons/fa";
import './Song.css';


const Song = ({ song }) => {
    const { t } = useTranslation();
    const { currentSong, playSong, isPlaying, setIsPlaying } = usePlayer();
    const isCurrentSong = currentSong && currentSong._id === song._id;
    const formatNumber = (number) => {
      if (number >= 1000000) {
          return (number / 1000000).toFixed(1) + 'M';
      } else if (number >= 1000) {
          return (number / 1000).toFixed(1) + 'K';
      }
      return number;
    }
    return (
        <>
            <tr
                key={song.id}
                className={`group 
                    ${isCurrentSong ? 'bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-100' : 'dark:hover:bg-gray-700/50 hover:bg-gray-50'
                    }`}
            >
                <td className="px-4 py-3 w-16 text-center">
                    <button
                        onClick={() => {
                            if (isCurrentSong) {
                                setIsPlaying(!isPlaying);
                            } else {
                                playSong(song);
                            }
                        } }
                        className=" d-flex items-center justify-center p-3"
                    >
                        {isCurrentSong && isPlaying
                        ? <FaCompactDisc className="w-6 h-6 spin-animation" /> 
                        : <FaPlay className="w-6 h-6 " />}
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
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    {formatNumber(song.views)}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    {formatNumber(song.likes)}
                </td>
            </tr>
        </>
    )
};

export default Song;