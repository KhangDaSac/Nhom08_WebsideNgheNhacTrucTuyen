import { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle, AlertCircle, Loader2, Music } from "lucide-react";
import axios from "axios";
import Songs from "../components/basic-component/song/Songs";

const SongManager = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:5000/api/songs");
      if (response.data && response.data.data) {
        setSongs(response.data.data);
      } else {
        setError("Invalid response format from API");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setError(error.message || "Error loading songs");
    }
  };

  const removeSong = (songId) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song._id !== songId));
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 dark:text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Error loading songs</h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <button 
          onClick={fetchSongs}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          <Music className="inline mr-2" /> Quản lý bài hát
        </h1>
        <button 
          className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded flex items-center transition-colors"
          onClick={() => {
            setCurrentSong(null);
            setShowModal(true);
          }}
        >
          <PlusCircle className="mr-2" size={18} />
          Thêm bài hát
        </button>
      </div>

      {songs.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <Music className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No songs found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Get started by creating a new song.</p>
          <button
            onClick={() => {
              setCurrentSong(null);
              setShowModal(true);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors"
          >
            Add your first song
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <Songs songs={songs} removeSong={removeSong}></Songs>
        </div>
      )}

      {/* Needed for add/edit functionality - would be a modal dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentSong ? 'Edit Song' : 'Add New Song'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              {/* Form would go here */}
              <p className="text-gray-500 dark:text-gray-400 text-center">Form implementation coming soon</p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors"
              >
                {currentSong ? 'Save Changes' : 'Create Song'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongManager;