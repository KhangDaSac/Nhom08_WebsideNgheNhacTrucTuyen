import React from 'react';
import { Pencil, Trash2, Music } from "lucide-react";
import axios from "axios";
import { useToast } from "../../../contexts/ToastContext";

const Song = ({ song }) => {
  const { showSuccessToast, showErrorToast } = useToast();

  const deleteSong= async (songId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/songs/delete/${songId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return { ...error.response.data };
    }
  }

  const handleDelete = async () => {
    const result = await deleteSong(song._id);
    if(result.success) {
      showSuccessToast("Song deleted successfully!");
    }else {
      showErrorToast("Failed to delete song. Please try again.");
    }
  }



  return (
    <tr key={song._id} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <td className="p-3">
        {song.image_url ? (
          <img
            src={song.image_url}
            alt={song.song_name}
            className="w-12 h-12 object-cover rounded ring-1 ring-gray-200 dark:ring-gray-700"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <Music className="text-gray-400 dark:text-gray-500" size={20} />
          </div>
        )}
      </td>
      <td className="p-3 text-gray-800 dark:text-gray-200">{song.song_name}</td>
      <td className="p-3 text-gray-800 dark:text-gray-200">
        {song.artists && Array.isArray(song.artists)
          ? song.artists.map(a => a.artist_name).join(", ")
          : song.artist_id?.artist_name || "Unknown Artist"}
      </td>
      <td className="p-3 text-gray-700 dark:text-gray-300">
        <div className="flex flex-wrap gap-1">
          {song.genres && Array.isArray(song.genres)
            ? song.genres.map((genre, i) => (
              <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                {genre}
              </span>
            ))
            : <span className="text-gray-400 dark:text-gray-500">No genres</span>}
        </div>
      </td>
      <td className="p-3 text-gray-700 dark:text-gray-300">
        {song.release_date
          ? new Date(song.release_date).toLocaleDateString("vi-VN")
          : "N/A"}
      </td>
      <td className="p-3 text-gray-700 dark:text-gray-300">{(song.views || 0).toLocaleString()}</td>
      <td className="p-3 text-gray-700 dark:text-gray-300">{(song.likes || 0).toLocaleString()}</td>
      <td className="p-3">
        {song.audio_url ? (
          <audio
            controls
            src={song.audio_url}
            controlsList="nodownload"
          />
        ) : (
          <span className="text-gray-400 dark:text-gray-500">No audio</span>
        )}
      </td>
      <td className="p-3">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleDelete(song._id)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Song;
