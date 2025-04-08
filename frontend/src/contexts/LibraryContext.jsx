import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const { user } = useAuth();
    const [playlists, setPlaylists] = useState([]);
    const [songsLiked, setSongsLiked] = useState([]);
    const [artistsFollowed, setArtistsFollowed] = useState([]);
    const [albumsLiked, setAlbumsLiked] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?._id) {
            fetchLibrary();
        } else {
            setPlaylists([]);
        }
    }, [user]);

    const fetchLibrary = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/libraries/${user.library_id}`);
            setPlaylists(response.data.data.playlists);
            setSongsLiked(response.data.data.songs_liked);
            setArtistsFollowed(response.data.data.artists_followed);
            setAlbumsLiked(response.data.data.albums_liked);

            console.log("Playlists:", response.data.data.playlists);
            console.log("Songs Liked:", response.data.data.songs_liked);
            console.log("Artists Followed:", response.data.data.artists_followed);
            console.log("Albums Liked:", response.data.data.albums_liked);


        } catch (err) {
            console.error('Error fetching user playlists:', err);
            setError('Failed to load playlists');
        }
    };


    const createPlaylist = async ({ playlist_name }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/playlists/create', {
                playlist_name: playlist_name,
                library_id: user.library_id,
            });
        } catch (err) {
            console.error('Error creating playlist:', err);
            setError('Failed to create playlist');
            return { success: false, error: err.message || 'Failed to create playlist' };
        }
    };

    const deletePlaylist = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/playlists/${id}`);
            fetchLibrary();
        } catch (error) {
            console.error('Error deleting playlist:', error);
            setError('Failed to delete playlist');
        }
    };

    const addSongToPlaylist = async (playlistId, songId) => {
        try {
            const result = await axios.post(`http://localhost:5000/api/songs/addToPlaylist`, {
                song_id: songId,
                playlist_id: playlistId
            });
            return result.data;
        } catch (error) {
            console.error('Error adding song to playlist:', error);
            setError('Failed to add song to playlist');
        }
    }

    const removeSongFromPlaylist = async (playlistId, songId) => {
        try {
            const result = await axios.post(`http://localhost:5000/api/playlists/removeSong`, {
                song_id: songId,
                playlist_id: playlistId
            });

            return result.data;
        } catch (error) {
            console.error('Error removing song from playlist:', error);
            setError('Failed to remove song from playlist');
        }
    }

    return (
        <LibraryContext.Provider
            value={{
                createPlaylist,
                deletePlaylist,
                fetchLibrary,
                playlists,
                addSongToPlaylist,
                removeSongFromPlaylist
            }}
        >
            {children}
        </LibraryContext.Provider>
    );
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }
    return context;
};

export default LibraryContext;
