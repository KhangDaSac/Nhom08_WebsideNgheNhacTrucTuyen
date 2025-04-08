import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const { user } = useAuth();
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?._id) {
            fetchPlaylists();
        } else {
            setPlaylists([]);
        }
    }, [user]);

    useEffect(() => {
        console.log('Playlists updated:', playlists);
    }, [playlists]);

    const fetchPlaylists = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/libraries/playlists/${user.library_id}`);
            const data = response.data.data.playlists;
            setPlaylists(data);
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
            fetchPlaylists();
        } catch (error) {
            console.error('Error deleting playlist:', error);
            setError('Failed to delete playlist');
        }
    };

    return (
        <LibraryContext.Provider
            value={{
                createPlaylist,
                deletePlaylist,
                fetchPlaylists,
                playlists
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
