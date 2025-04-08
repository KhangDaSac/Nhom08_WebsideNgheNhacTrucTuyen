import { createContext, useState, useContext, useRef } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [queue, setQueue] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const nextSong = () => {
    if (queue.length > 0) {
      const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
      if (isShuffle) {
        const nextIndex = Math.floor(Math.random() * queue.length);
        setCurrentSong(queue[nextIndex]);
      } else if (currentIndex < queue.length - 1) {
        setCurrentSong(queue[currentIndex + 1]);
      } else if (isRepeat) {
        setCurrentSong(queue[0]);
      }
    }
  };

  const previousSong = () => {
    if (queue.length > 0) {
      const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
      if (currentIndex > 0) {
        setCurrentSong(queue[currentIndex - 1]);
      } else if (isRepeat) {
        setCurrentSong(queue[queue.length - 1]);
      }
    }
  };

  const updateProgress = (time) => {
    setProgress(time);
  };

  const updateVolume = (value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const addToQueue = (tracks) => {
    setQueue(prevQueue => [...prevQueue, ...tracks]);
  };

  const clearQueue = () => {
    setQueue([]);
    setCurrentSong(null);
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentSong,
        isPlaying,
        volume,
        progress,
        duration,
        isRepeat,
        isShuffle,
        queue,
        playSong,
        pauseTrack,
        togglePlay,
        toggleRepeat,
        toggleShuffle,
        nextSong,
        previousSong,
        updateProgress,
        updateVolume,
        seekTo,
        addToQueue,
        clearQueue,
        setDuration,
        setProgress,
        setIsPlaying,
        formatDuration,
        setVolume,
        isMuted,
        setIsMuted
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export default PlayerContext; 