import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import { FiSearch, FiPlay, FiClock } from 'react-icons/fi';
import Songs from '../components/basic-component/song/Songs';
import AlbumCards from '../components/basic-component/album-card/AlbumCards.jsx';
import ArtistCards from '../components/basic-component/artist-card/ArtistCards.jsx';
import axios from 'axios';
import { useSearch } from '../contexts/SearchContext';

const Search = () => {
  const { t } = useTranslation();
  const { playSong, currentSong, isPlaying } = usePlayer();
  const { keyword, setKeyword } = useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      await fetchSongs();
      await fetchArtists();
      await fetchAlbums();
      setIsLoading(false);
    };

    fetchData();
  }, [keyword]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/songs/search?keyword=' + keyword);
      setSongs(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/artists/search?keyword=' + keyword);
      setArtists(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/albums/search?keyword=' + keyword);
      setAlbums(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  const tabs = [
    { id: 'all', label: t('search.all') },
    { id: 'songs', label: t('search.songs') },
    { id: 'albums', label: t('search.albums') },
    { id: 'artists', label: t('search.artists') }
  ];

  const renderSongs = () => (
    songs.length > 0 ? <Songs songs={songs} collectionTitle={t('collection.song.songs')} /> : <></>
  );

  const renderAlbums = () => (
    albums.length > 0 ? <AlbumCards albums={albums} collectionTitle={t('collection.album.albums')} /> : <></>
  );

  const renderArtists = () => (
    artists.length > 0 ? <ArtistCards artists={artists} collectionTitle={t('collection.artist.artists')} /> : <></>
  );

  return (
    <div className="p-8">

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : songs.length > 0 || albums.length > 0 || artists.length > 0 ? (
        <div className="space-y-8">
          {(activeTab === 'all' || activeTab === 'songs') && (
            <section>
              {renderSongs()}
            </section>
          )}
          {(activeTab === 'all' || activeTab === 'albums') && (
            <section>
              {renderAlbums()}
            </section>
          )}
          {(activeTab === 'all' || activeTab === 'artists') && (
            <section>
              {renderArtists()}
            </section>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          {t('search.noResults')}
        </div>
      )}
    </div>
  );
};

export default Search; 