const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    song_name: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    album_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    genres: [{
        type: String
    }],
    release_date: {
        type: Date
    },
    audio_url: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    },
    artists: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
        artist_name: { type: String },
        image_url: { type: String }
    }]
});

module.exports = mongoose.model('Song', songSchema); 