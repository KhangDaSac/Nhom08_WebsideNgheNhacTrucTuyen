import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiRepeat,
  FiShuffle,
  FiVolume2,
  FiVolumeX,
  FiMaximize2,
  FiHeart,
} from 'react-icons/fi';

const Footer = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(30);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-primary-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Currently Playing */}
          <div className="flex items-center min-w-0 w-full sm:w-1/3">
            <div className="shrink-0">
              <img
                src="https://picsum.photos/56"
                alt="Album Cover"
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg shadow-sm"
              />
            </div>
            <div className="ml-3 min-w-0 flex-1">
              <Link
                to="/song/1"
                className="block text-sm font-medium text-gray-900 dark:text-white truncate hover:text-primary-500"
              >
                Song Title
              </Link>
              <Link
                to="/artist/1"
                className="block text-xs text-gray-500 dark:text-gray-400 truncate hover:text-primary-500"
              >
                Artist Name
              </Link>
            </div>
            <button className="shrink-0 p-2 text-gray-400 hover:text-red-500">
              <FiHeart className="w-5 h-5" />
            </button>
          </div>

          {/* Player Controls */}
          <div className="hidden sm:flex flex-col items-center max-w-md w-1/3">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FiShuffle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FiSkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                {isPlaying ? (
                  <FiPause className="w-6 h-6" />
                ) : (
                  <FiPlay className="w-6 h-6 relative left-0.5" />
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FiSkipForward className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FiRepeat className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center w-full max-w-md mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">
                1:23
              </span>
              <div className="mx-3 flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 w-12">
                3:45
              </span>
            </div>
          </div>

          {/* Mobile Player Controls */}
          <div className="flex sm:hidden items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FiSkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              {isPlaying ? (
                <FiPause className="w-5 h-5" />
              ) : (
                <FiPlay className="w-5 h-5 relative left-0.5" />
              )}
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FiSkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Controls */}
          <div className="hidden sm:flex items-center justify-end w-1/3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {isMuted ? (
                <FiVolumeX className="w-5 h-5" />
              ) : (
                <FiVolume2 className="w-5 h-5" />
              )}
            </button>
            <div className="w-32 mx-3">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FiMaximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="sm:hidden px-4 pb-3">
        <div className="flex items-center w-full">
          <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
            1:23
          </span>
          <div className="mx-2 flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
            3:45
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer; 