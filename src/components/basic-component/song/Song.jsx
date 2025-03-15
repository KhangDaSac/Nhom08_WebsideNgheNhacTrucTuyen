import { FiPlay } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';


const Song = ({ song, isCurrentSong, play, formatDuration }) => {
    const { t } = useTranslation();
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
                        onClick={() => play(song)}
                        className="p-2 rounded-full bg-primary-500 text-white flex items-center justify-center w-8 h-8"
                    >
                        <FiPlay className="w-4 h-4 relative left-[1px]" />
                    </button>
                </td>
                <td className="px-4 py-3">
                    <span
                        className={`font-medium truncate ${isCurrentSong
                                ? 'text-primary-500'
                                : 'text-gray-900 dark:text-white'
                            }`}
                    >
                        {song.title}
                    </span>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 hidden md:table-cell truncate">
                    {song.album}
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