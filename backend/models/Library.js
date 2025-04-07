const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    following: [{
        artist_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        },
        artist_name: String,
        image_url: String
    }],
    song_liked: [{
        song_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        },
        song_name: String,
        image_url: String
    }],
    album_liked: [{
        album_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album'
        },
        album_name: String,
        image_url: String
    }],
    playlists: [{
        playlist_id: {
            type: mongoose.Schema.Types.ObjectId
        },
        playlist_name: String,
        image_url: String
    }]
});

module.exports = mongoose.model('Library', librarySchema); 