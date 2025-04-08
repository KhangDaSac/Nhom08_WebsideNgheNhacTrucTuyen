import { useEffect, useState } from "react";
import axios from "axios";

const ManageArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/artists");
        setArtists(res.data.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu nghệ sĩ:", err);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎤 Manage Artists</h1>
      {artists.map((artist) => (
        <div key={artist._id} className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex items-start gap-4">
            <img
              src={artist.image_url}
              alt={artist.artist_name}
              className="w-24 h-24 object-cover rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{artist.artist_name}</h2>
              <p className="text-sm text-gray-500 mb-1">
                🎂 {new Date(artist.date_of_birth).toLocaleDateString()} | 👥{" "}
                {artist.followers.toLocaleString()} followers
              </p>
              <p className="text-sm text-gray-600 mb-2">
                🎶 Thể loại: {artist.genres.join(", ")}
              </p>
              <p className="text-sm text-gray-700">{artist.description}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-1">🎵 Bài hát:</h3>
            <div className="flex flex-wrap gap-4">
              {artist.songs.map((song) => (
                <div
                  key={song._id}
                  className="w-28 text-center text-sm hover:scale-105 transition"
                >
                  <img
                    src={song.image_url}
                    alt={song.song_name}
                    className="w-28 h-28 rounded-lg object-cover"
                  />
                  <p className="mt-1 truncate">{song.song_name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-1">💿 Album:</h3>
            <div className="flex flex-wrap gap-4">
              {artist.albums.map((album) => (
                <div
                  key={album._id}
                  className="w-28 text-center text-sm hover:scale-105 transition"
                >
                  <img
                    src={album.image_url}
                    alt={album.album_name}
                    className="w-28 h-28 rounded-lg object-cover"
                  />
                  <p className="mt-1 truncate">{album.album_name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageArtists;
