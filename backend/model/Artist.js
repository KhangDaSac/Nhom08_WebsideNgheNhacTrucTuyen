const mongoose = require('mongoose');

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
    image_url: {
        type: String
    },
    description: {
        type: String
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
});

module.exports = mongoose.model('Artist', artistSchema); 