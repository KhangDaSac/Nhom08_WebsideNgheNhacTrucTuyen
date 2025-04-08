import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLibrary } from '../contexts/LibraryContext';
import { useAuth } from '../contexts/AuthContext';
import { usePlayer } from '../contexts/PlayerContext';
import { Tab } from '@headlessui/react';
import { FiMusic, FiUser, FiDisc } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';
import SongCards from '../components/basic-component/song-card/SongCards';
import AlbumCards from '../components/basic-component/album-card/AlbumCards';
import ArtistCards from '../components/basic-component/artist-card/ArtistCards';

const Library = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const {
    fetchLibrary,
    songsLiked,
    artistsFollowed,
    albumsLiked
  } = useLibrary();
  const { playSong } = usePlayer();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (user?._id) {
      fetchLibrary();
      setIsLoading(false);
    }
  }, [user]);

  const renderLoadingState = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  );

  const renderEmptyState = (message) => (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
      <p className="mb-4">{message}</p>
    </div>
  );

  const categories = [
    {
      name: t('library.songs_liked'),
      icon: FiMusic,
      content: isLoading ? renderLoadingState() : (
        <div className="grid gap-4">
          {songsLiked && songsLiked.length > 0 ? (
            <SongCards songs={songsLiked} ></SongCards>
          ) : (
            renderEmptyState(t('library.no_liked_songs'))
          )}
        </div>
      ),
    },
    {
      name: t('library.albums_liked'),
      icon: FiDisc,
      content: isLoading ? renderLoadingState() : (
        <div className="grid gap-4">
          {console.log(albumsLiked)}
          {albumsLiked && albumsLiked.length > 0 ? (
            
            <AlbumCards albums={albumsLiked} />
          ) : (
            renderEmptyState(t('library.no_liked_albums'))
          )}
        </div>
      ),
    },
    {
      name: t('library.artists_followed'),
      icon: FiUser,
      content: isLoading ? renderLoadingState() : (
        <div className="grid gap-4">
          {artistsFollowed && artistsFollowed.length > 0 ? (
            <ArtistCards artists={artistsFollowed}  />
          ) : (
            renderEmptyState(t('library.no_followed_artists'))
          )}
        </div>
      ),
    },
  ];

  if (!user) {

  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('library.title')}
      </h1>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-2 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-6">
          {categories.map((category, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `flex items-center space-x-2 w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5
                ${selected
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-white/[0.12] hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((category, index) => (
            <Tab.Panel
              key={index}
              className={`rounded-xl bg-white dark:bg-gray-900 p-3
                ring-white/60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2`}
            >
              {category.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Library;