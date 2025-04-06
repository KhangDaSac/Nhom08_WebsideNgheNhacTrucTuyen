const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    album_name: {
        type: String,
        required: true
    },
    release_date: {
        type: Date
    },
    image_url: {
        type: String
    },
    song_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    },
    artist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    }
});

module.exports = mongoose.model('Album', albumSchema); 