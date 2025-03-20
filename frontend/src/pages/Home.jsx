import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SongCards from '../components/basic-component/song-card/SongCards';
import AlbumCards from '../components/basic-component/album-card/AlbumCards.jsx';
import ArtistCards from '../components/basic-component/artist-card/ArtistCards.jsx';
import axios from 'axios';

const Home = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [popularSongs, setPopularSongs] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSongs();
      await fetchArtists();
    };

    fetchData();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/songs');
      setPopularSongs(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/artists');
      setPopularArtists(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {

        const albums = [
          {
            id: 1,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/300',
            year: 2024,
          },
          {
            id: 2,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/300',
            year: 2024,
          },
          {
            id: 3,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/300',
            year: 2024,
          },
          {
            id: 4,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/300',
            year: 2024,
          },
          {
            id: 5,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/300',
            year: 2024,
          },
          {
            id: 6,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/300',
            year: 2024,
          },
          {
            id: 7,
            title: 'Album Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/300',
            year: 2024,
          },
        ]

        setPopularAlbums(albums);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/1920/1080"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {t('home.welcome')}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              {t('home.title')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Recent Songs */}
        <section>
            <SongCards songs={popularSongs} collectionTitle={t('collection.song.popularSongs')} />
        </section>

        {/* Featured Albums */}
        <section>
          <AlbumCards albums={popularAlbums} collectionTitle={t('collection.album.popularAlbums')} />
        </section>

        {/* Popular Artists */}
        <section>
          <ArtistCards artists={popularArtists} collectionTitle={t('collection.artist.popularArtists')} />
        </section>
      </div>
    </div>
  );
};

export default Home; 