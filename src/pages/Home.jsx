import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '../contexts/PlayerContext';
import SongCards from '../components/basic-component/song-card/SongCards';
import AlbumCards from '../components/basic-component/album-card/AlbumCards.jsx';
import {
  FiPlay
} from 'react-icons/fi';

const Home = () => {
  const { t } = useTranslation();
  const { play, currentSong, isPlaying } = usePlayer();
  const [isLoading, setIsLoading] = useState(true);
  const [recentSongs, setRecentSongs] = useState([]);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls
        const songs = [
          {
            id: 1,
            title: 'Song Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            duration: 180,
          },
          {
            id: 2,
            title: 'Song Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            duration: 180,
          },
          {
            id: 3,
            title: 'Song Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            duration: 180,
          },
          {
            id: 4,
            title: 'Song Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            duration: 180,
          },
          {
            id: 5,
            title: 'Song Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            duration: 180,
          },
          {
            id: 6,
            title: 'Song Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            duration: 180,
          },
          {
            id: 7,
            title: 'Song Title 1',
            artist: 'Artist Name',
            coverUrl: 'https://picsum.photos/200',
            duration: 180,
          }
        ];

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
          // Add more albums...
        ];

        const artists = [
          {
            id: 1,
            name: 'Artist Name 1',
            imageUrl: 'https://picsum.photos/200',
            followers: '1.2M',
          },
          // Add more artists...
        ];

        setRecentSongs(songs);
        setFeaturedAlbums(albums);
        setPopularArtists(artists);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
          <SongCards songs={recentSongs} collectionTitle={t('collection.song.popularSongs')} currentSong={currentSong} play={play} formatDuration={formatDuration} />
        </section>

        {/* Featured Albums */}
        <section>
          <AlbumCards albums={featuredAlbums} collectionTitle={t('collection.album.popularAlbums')} />
        </section>

        {/* Popular Artists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('home.popularArtists')}
            </h2>
            <Link
              to="/artists"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              {t('home.viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {popularArtists.map((artist) => (
              <Link
                key={artist.id}
                to={`/artist/${artist.id}`}
                className="group text-center"
              >
                <div className="relative aspect-square rounded-full overflow-hidden mb-3">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="p-3 bg-primary-500 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center justify-center">
                      <FiPlay className="w-6 h-6 relative left-[1px]" />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {artist.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {artist.followers} followers
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 