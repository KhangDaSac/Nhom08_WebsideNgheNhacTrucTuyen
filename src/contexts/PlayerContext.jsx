import { createContext, useContext, useState, useRef } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [queue, setQueue] = useState([]);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [lyrics, setLyrics] = useState(null);

  const play = (song) => {
    if (song) {
      setCurrentSong(song);
      audioRef.current.src = song.url;
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setAudioVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const skipToNext = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(queue.slice(1));
      play(nextSong);
    }
  };

  const skipToPrevious = () => {
    // Implementation depends on history tracking
    console.log('Skip to previous');
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    audioRef.current.loop = !isRepeat;
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const addToQueue = (song) => {
    setQueue([...queue, song]);
  };

  const removeFromQueue = (index) => {
    const newQueue = [...queue];
    newQueue.splice(index, 1);
    setQueue(newQueue);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const loadLyrics = async (songId) => {
    try {
      // Simulate API call to fetch lyrics
      const response = {
        lyrics: [
          { time: 0, text: 'Sample lyrics line 1' },
          { time: 30, text: 'Sample lyrics line 2' },
          // ... more lyrics
        ]
      };
      setLyrics(response.lyrics);
    } catch (error) {
      console.error('Failed to load lyrics:', error);
      setLyrics(null);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        duration,
        currentTime,
        queue,
        isRepeat,
        isShuffle,
        isMuted,
        lyrics,
        play,
        pause,
        togglePlay,
        setAudioVolume,
        toggleMute,
        seek,
        skipToNext,
        skipToPrevious,
        toggleRepeat,
        toggleShuffle,
        addToQueue,
        removeFromQueue,
        clearQueue,
        loadLyrics
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}; 