import { useEffect, useState } from "react";
import axios from "axios";

const ManageAlbums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/albums");
        console.log("Dữ liệu trả về:", res.data);
        setAlbums(res.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu album:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💿 Manage Albums</h1>
      {albums.map((album) => (
        <div key={album._id} className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex items-start gap-4">
            <img
              src={album.image_url}
              alt={album.album_name}
              className="w-28 h-28 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{album.album_name}</h2>
              <p className="text-sm text-gray-500 mb-1">
                📅 Phát hành:{" "}
                {new Date(album.release_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                👨‍🎤 Nghệ sĩ: {album.artists.map((a) => a.artist_name).join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                🎶 Thể loại: {album.genres.join(", ")}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-1">🎵 Bài hát trong album:</h3>
            <div className="flex flex-wrap gap-4">
              {album.songs.map((song) => (
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
        </div>
      ))}
    </div>
  );
};

export default ManageAlbums;
