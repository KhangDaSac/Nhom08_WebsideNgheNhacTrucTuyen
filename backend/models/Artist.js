const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date
    },
    followers: {
        type: Number,
        default: 0
    },
    genres: {
        type: [String]
    },
    image_url: {
        type: String
    },
    description: {
        type: String
    },
    song_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    },
    album_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    }
});

module.exports = mongoose.model('Artist', artistSchema); 