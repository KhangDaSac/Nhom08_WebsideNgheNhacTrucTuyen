import { createContext, useState, useContext, useRef } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [queue, setQueue] = useState([]);

  const playTrack = (track) => {
    setCurrentTrack(track);
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

  const nextTrack = () => {
    if (queue.length > 0) {
      const currentIndex = queue.findIndex(track => track.id === currentTrack?.id);
      if (isShuffle) {
        const nextIndex = Math.floor(Math.random() * queue.length);
        setCurrentTrack(queue[nextIndex]);
      } else if (currentIndex < queue.length - 1) {
        setCurrentTrack(queue[currentIndex + 1]);
      } else if (isRepeat) {
        setCurrentTrack(queue[0]);
      }
    }
  };

  const previousTrack = () => {
    if (queue.length > 0) {
      const currentIndex = queue.findIndex(track => track.id === currentTrack?.id);
      if (currentIndex > 0) {
        setCurrentTrack(queue[currentIndex - 1]);
      } else if (isRepeat) {
        setCurrentTrack(queue[queue.length - 1]);
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
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentTrack,
        isPlaying,
        volume,
        progress,
        duration,
        isRepeat,
        isShuffle,
        queue,
        playTrack,
        pauseTrack,
        togglePlay,
        toggleRepeat,
        toggleShuffle,
        nextTrack,
        previousTrack,
        updateProgress,
        updateVolume,
        seekTo,
        addToQueue,
        clearQueue,
        setDuration
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