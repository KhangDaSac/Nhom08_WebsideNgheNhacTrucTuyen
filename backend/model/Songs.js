const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist_id: [String],
    album_id: String,
    duration: Number,
    genre: [String],
    releaseDate: Date,
    likes: Number,
    audioUrl: String,
    imageUrl: String
});

const Songs = mongoose.model('Songs', songSchema);

module.exports = Songs;

