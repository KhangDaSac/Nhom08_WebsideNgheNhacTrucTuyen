const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    playlist_name: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    image_url: {
        type: String
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]
});

module.exports = mongoose.model('Playlist', playlistSchema); 