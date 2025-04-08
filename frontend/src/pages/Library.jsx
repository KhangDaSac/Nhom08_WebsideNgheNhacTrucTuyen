import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from '@headlessui/react';
import { FiClock, FiMusic, FiUser, FiDisc } from 'react-icons/fi';

const Library = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const recentlyPlayed = [
    {
      id: 1,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      duration: '3:53',
      image: '/album-covers/1.jpg'
    },
    // Thêm các bài hát khác...
  ];

  const likedSongs = [
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      image: '/album-covers/2.jpg'
    },
    // Thêm các bài hát khác...
  ];

  const playlists = [
    {
      id: 1,
      name: 'My Playlist #1',
      songCount: 15,
      image: '/playlist-covers/1.jpg'
    },
    // Thêm các playlist khác...
  ];

  const albums = [
    {
      id: 1,
      name: 'Future Nostalgia',
      artist: 'Dua Lipa',
      year: 2020,
      image: '/album-covers/3.jpg'
    },
    // Thêm các album khác...
  ];

  const categories = [
    {
      name: t('library.songs_liked'),
      icon: FiClock,
      content: (
        <div className="grid gap-4">
          {recentlyPlayed.map((song) => (
            <div
              key={song.id}
              className="flex items-center space-x-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <img
                src={song.image}
                alt={song.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {song.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {song.artist}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {song.duration}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: t('library.albums_liked'),
      icon: FiMusic,
      content: (
        <div className="grid gap-4">
          {likedSongs.map((song) => (
            <div
              key={song.id}
              className="flex items-center space-x-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <img
                src={song.image}
                alt={song.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {song.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {song.artist}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {song.duration}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: t('library.artists_followed'),
      icon: FiDisc,
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <div
              key={album.id}
              className="flex flex-col space-y-2 p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                src={album.image}
                alt={album.name}
                className="w-full aspect-square rounded-md object-cover"
              />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {album.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {album.artist} • {album.year}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('Your Library')}
      </h1>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-2 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-6">
          {categories.map((category, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `flex items-center space-x-2 w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5
                ${
                  selected
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