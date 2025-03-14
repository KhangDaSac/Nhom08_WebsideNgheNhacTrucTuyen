import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../../contexts/PlayerContext';
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiRepeat,
  FiShuffle,
  FiVolume2,
  FiVolumeX,
  FiHeart,
  FiList,
} from 'react-icons/fi';

const Player = () => {
  const { t } = useTranslation();
  const {
    currentSong,
    isPlaying,
    volume,
    duration,
    currentTime,
    queue,
    isRepeat,
    isShuffle,
    isMuted,
    togglePlay,
    setAudioVolume,
    toggleMute,
    seek,
    skipToNext,
    skipToPrevious,
    toggleRepeat,
    toggleShuffle,
  } = usePlayer();

  const [showQueue, setShowQueue] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const progressBarRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center w-1/4">
          {currentSong && (
            <>
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="h-12 w-12 rounded-md"
              />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentSong.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentSong.artist}
                </p>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isFavorite ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <FiHeart className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isShuffle ? 'text-primary-500' : 'text-gray-400'
              }`}
            >
              <FiShuffle className="h-5 w-5" />
            </button>
            <button
              onClick={skipToPrevious}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
            >
              <FiSkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center"
            >
              {isPlaying ? (
                <FiPause className="h-6 w-6" />
              ) : (
                <FiPlay className="h-6 w-6 relative left-[1px]" />
              )}
            </button>
            <button
              onClick={skipToNext}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
            >
              <FiSkipForward className="h-5 w-5" />
            </button>
            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isRepeat ? 'text-primary-500' : 'text-gray-400'
              }`}
            >
              <FiRepeat className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2 mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(currentTime)}
            </span>
            <div
              ref={progressBarRef}
              onClick={handleProgressBarClick}
              className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
            >
              <div
                className="h-1 bg-primary-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume & Queue */}
        <div className="flex items-center justify-end w-1/4 space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
            >
              {isMuted ? (
                <FiVolumeX className="h-5 w-5" />
              ) : (
                <FiVolume2 className="h-5 w-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
          <button
            onClick={() => setShowQueue(!showQueue)}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
              showQueue ? 'text-primary-500' : 'text-gray-400'
            }`}
          >
            <FiList className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Queue Panel */}
      {showQueue && (
        <div className="absolute bottom-full right-0 w-80 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('player.queue')}
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {queue.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="h-10 w-10 rounded"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {song.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {song.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player; 