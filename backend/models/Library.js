const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    artists_followed: [{
        artist_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        },
        artist_name: String,
        image_url: String
    }],
    songs_liked: [{
        song_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        },
        song_name: String,
        image_url: String
    }],
    albums_liked: [{
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