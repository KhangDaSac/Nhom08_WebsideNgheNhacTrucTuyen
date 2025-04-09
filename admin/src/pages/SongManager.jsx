import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, PlusCircle, AlertCircle, Loader2, Music, Upload, X, Calendar } from "lucide-react";
import axios from "axios";
import Songs from "../components/basic-component/song/Songs";
import { handleUploadImage, handleUploadAudio } from "../utils/UploadFile";

const SongManager = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const [formData, setFormData] = useState({
    song_name: '',
    genres: [],
    release_date: '',
    artist_id: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [artists, setArtists] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const availableGenres = ['Tình cảm', 'Gia đình', 'Lãng mạn'];

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

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/artists");
        if (response.data && response.data.data) {
          setArtists(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    if (showModal) {
      fetchArtists();
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      if (currentSong) {
        setFormData({
          song_name: currentSong.song_name || '',
          genres: currentSong.genres || [],
          release_date: currentSong.release_date ? new Date(currentSong.release_date).toISOString().split('T')[0] : '',
          artist_id: currentSong.artist_id?._id || ''
        });
        setImagePreview(currentSong.image_url || '');
      } else {
        setFormData({
          song_name: '',
          genres: [],
          release_date: '',
          artist_id: ''
        });
        setImagePreview('');
        setImageFile(null);
        setAudioFile(null);
      }
      setFormErrors({});
    }
  }, [showModal, currentSong]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleGenreChange = (genre) => {
    const updatedGenres = formData.genres.includes(genre)
      ? formData.genres.filter(g => g !== genre)
      : [...formData.genres, genre];

    setFormData({
      ...formData,
      genres: updatedGenres
    });

    if (formErrors.genres) {
      setFormErrors({
        ...formErrors,
        genres: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        setFormErrors({
          ...formErrors,
          image: 'Please select a JPG or PNG file'
        });
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      if (formErrors.image) {
        setFormErrors({
          ...formErrors,
          image: ''
        });
      }
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('audio/mpeg') && !file.type.match('audio/mp3')) {
        setFormErrors({
          ...formErrors,
          audio: 'Please select an MP3 file'
        });
        return;
      }

      setAudioFile(file);
      if (formErrors.audio) {
        setFormErrors({
          ...formErrors,
          audio: ''
        });
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.song_name.trim()) errors.song_name = 'Song name is required';
    if (!formData.artist_id) errors.artist_id = 'Artist is required';

    if (!currentSong) {
      if (!audioFile) errors.audio = 'Audio file is required';
      if (!imageFile) errors.image = 'Image is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('song_name', formData.song_name);
      submitData.append('artist_id', formData.artist_id);

      formData.genres.forEach(genre => {
        submitData.append('genres[]', genre);
      });

      if (formData.release_date) {
        submitData.append('release_date', formData.release_date);
      }

      const image = await handleUploadImage(imageFile);

      if (image) {
        submitData.append('image_url', image.secure_url);
      }

      const audio = await handleUploadAudio(audioFile);
      if (audio) {
        submitData.append('audio_url', audio.secure_url);
      }
      console.log(audio);
      console.log(image);
      console.log(submitData);
      console.log(submitData.values());

      const dataObject = Object.fromEntries(submitData.entries());
      console.log(dataObject);


      const response = await axios.post('http://localhost:5000/api/songs/add', dataObject, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        fetchSongs();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

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
          className="px-4 py-3 gap-3 rounded-xl text-sm text-primary-100 bg-primary-600 dark:text-primary-100 hover:bg-primary-400 dark:hover:bg-primary-500 flex items-center"
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
          className="px-4 py-3 gap-3 rounded-xl text-sm text-primary-100 bg-primary-600 dark:text-primary-100 hover:bg-primary-400 dark:hover:bg-primary-500 flex items-center"
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
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <Songs songs={songs} removeSong={removeSong}></Songs>
        </div>
      )}

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
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="song_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Song Name *
                  </label>
                  <input
                    type="text"
                    id="song_name"
                    name="song_name"
                    value={formData.song_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${formErrors.song_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white`}
                    placeholder="Enter song name"
                  />
                  {formErrors.song_name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.song_name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="artist_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Artist *
                  </label>
                  <select
                    id="artist_id"
                    name="artist_id"
                    value={formData.artist_id}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${formErrors.artist_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white`}
                  >
                    <option value="">Select an artist</option>
                    {artists.map(artist => (
                      <option key={artist._id} value={artist._id}>
                        {artist.artist_name}
                      </option>
                    ))}
                  </select>
                  {formErrors.artist_id && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.artist_id}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Genres
                  </label>
                  <div className="mt-2 space-y-2">
                    {availableGenres.map(genre => (
                      <div key={genre} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`genre-${genre}`}
                          name="genres"
                          checked={formData.genres.includes(genre)}
                          onChange={() => handleGenreChange(genre)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <label htmlFor={`genre-${genre}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                  {formErrors.genres && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.genres}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="release_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Release Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="release_date"
                      name="release_date"
                      value={formData.release_date}
                      onChange={handleInputChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image (JPG or PNG) {!currentSong && '*'}
                  </label>
                  <div className="mt-1 flex items-center">
                    <div className="flex-shrink-0">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Song cover"
                          className="h-24 w-24 object-cover rounded"
                        />
                      ) : (
                        <div className="h-24 w-24 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Music className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-5">
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => imageInputRef.current.click()}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                  {formErrors.image && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.image}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Audio File (MP3) {!currentSong && '*'}
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      accept="audio/mpeg, audio/mp3"
                      ref={audioInputRef}
                      onChange={handleAudioChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => audioInputRef.current.click()}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
                    >
                      <Upload className="mr-2 h-5 w-5" /> {audioFile ? 'Change Audio File' : 'Upload Audio File'}
                    </button>
                    {audioFile && (
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {audioFile.name}
                      </span>
                    )}
                  </div>
                  {formErrors.audio && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.audio}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    {currentSong ? 'Saving...' : 'Creating...'}
                  </>
                ) : (
                  currentSong ? 'Save Changes' : 'Create Song'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongManager;