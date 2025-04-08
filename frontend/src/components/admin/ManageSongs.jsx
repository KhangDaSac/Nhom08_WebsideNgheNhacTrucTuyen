import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

const ManageSongs = () => {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/songs");
      setSongs(response.data.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎶 Quản lý bài hát</h1>
      <table className="w-full text-left bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Ảnh</th>
            <th className="p-3">Tên bài hát</th>
            <th className="p-3">Nghệ sĩ</th>
            <th className="p-3">Thể loại</th>
            <th className="p-3">Phát hành</th>
            <th className="p-3">Lượt xem</th>
            <th className="p-3">Lượt thích</th>
            <th className="p-3">Nghe thử</th>
            <th className="p-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(songs) &&
            songs.map((song) => (
              <tr key={song._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={song.image_url}
                    alt={song.song_name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3">{song.song_name}</td>
                <td className="p-3">
                  {song.artists.map((a) => a.artist_name).join(", ")}
                </td>
                <td className="p-3">{song.genres.join(", ")}</td>
                <td className="p-3">
                  {new Date(song.release_date).toLocaleDateString("vi-VN")}
                </td>
                <td className="p-3">{song.views.toLocaleString()}</td>
                <td className="p-3">{song.likes.toLocaleString()}</td>
                <td className="p-3">
                  <audio controls src={song.audio_url} className="w-32" />
                </td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSongs;
