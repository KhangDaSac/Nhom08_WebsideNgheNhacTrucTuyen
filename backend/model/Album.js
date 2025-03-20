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
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }]
});

module.exports = mongoose.model('Album', albumSchema); 