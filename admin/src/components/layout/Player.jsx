import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePlayer } from '../../contexts/PlayerContext';
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiRepeat,
  FiShuffle,
  FiMaximize2,
  FiHeart,
} from 'react-icons/fi';
import { FaPlay, FaPause } from "react-icons/fa6";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark  } from "react-icons/hi2";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    setProgress,
    isFavorite,
    setIsFavorite,
    setDuration,
    duration,
    progress,
    formatDuration
  } = usePlayer();

  const audioRef = useRef(null);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audio_url;
      audioRef.current.play();
      handleLoadedMetadata();
      handleTimeUpdate();
      setIsPlaying(true);
    }
  }, [currentSong]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (isMuted) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
    }
  }, [isMuted]);



  return (
    <>
      {
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40">
          <audio
            controls
            style={{ display: 'none' }}
            ref={audioRef}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}>
            <source src={currentSong?.audio_url} type="audio/mpeg"></source>
          </audio>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full bg-primary-500"
              style={{ width: `${progress / duration * 100}%` }}
            ></div>
          </div>

          <div className="px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Currently Playing */}
              <div className="flex items-center min-w-0 w-full sm:w-1/3">
                <div className="shrink-0">
                  <img
                    src={currentSong?.image_url}
                    alt="Album Cover"
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg shadow-sm"
                  />
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <Link
                    to="/song/1"
                    className="block text-sm font-medium text-gray-900 dark:text-white truncate hover:text-primary-500"
                  >
                    {currentSong?.song_name}
                  </Link>
                  <Link
                    to="/artist/1"
                    className="block text-xs text-gray-500 dark:text-gray-400 truncate hover:text-primary-500"
                  >
                    {currentSong?.artists.map(artist => artist.artist_name).join(', ')}
                  </Link>

                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${isFavorite ? 'text-red-500' : 'text-gray-400'
                    }`}
                >
                  <FiHeart className="h-5 w-5" />
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
                      <FaPause className="w-6 h-6" />
                    ) : (
                      <FaPlay className="w-6 h-6 relative left-0.5" />
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
                    {formatDuration(progress)}
                  </span>
                  <div className="mx-3 flex-1">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={progress}
                      onChange={(e) => {
                        setProgress(parseInt(e.target.value));
                        audioRef.current.currentTime = parseInt(e.target.value);
                      }}
                      className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
                      style={{
                        background: `linear-gradient(to right, var(--primary-500) 0%, var(--primary-500) ${progress / duration * 100}%, var(--gradient-end) ${progress / duration * 100}%, var(--gradient-end) 100%)`
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-12">
                    {formatDuration(duration)}
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
              <div className="hidden sm:flex items-center justify-end items-center w-1/3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {isMuted ? (
                    <HiMiniSpeakerXMark className="w-5 h-5" />
                  ) : (
                    <HiMiniSpeakerWave className="w-5 h-5" />
                  )}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      if (isMuted) {
                        setIsMuted(false);
                      }
                      setVolume(parseInt(e.target.value));
                    }}
                    className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm sm:w-32"
                    style={{
                      background: `linear-gradient(to right, var(--primary-500) 0%, var(--primary-500) ${isMuted ? 0 : volume / 100 * 100}%, var(--gradient-end) ${isMuted ? 0 : volume / 100 * 100}%, var(--gradient-end) 100%)`
                    }}
                  />
              </div>
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="sm:hidden px-4 pb-3">
            <div className="flex items-center w-full">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                {formatDuration(progress)}
              </span>
              <div className="mx-2 flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={progress}
                  onChange={(e) => {
                    setProgress(parseInt(e.target.value));
                    audioRef.current.currentTime = parseInt(e.target.value);
                  }}
                  className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
                  style={{
                    background: `linear-gradient(to right, var(--primary-500) ${progress / duration * 100}%, #ccc ${progress / duration * 100}%)`
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                {formatDuration(duration)}
              </span>
            </div>
          </div>
        </div>
      }
    </>

  );
};

export default Player; 