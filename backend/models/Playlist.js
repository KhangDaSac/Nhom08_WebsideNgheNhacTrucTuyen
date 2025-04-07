const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    playlist_name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        default: 'https://photo-zmp3.zmdcdn.me/album_default.png'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    song_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    },

});

module.exports = mongoose.model('Playlist', playlistSchema); 