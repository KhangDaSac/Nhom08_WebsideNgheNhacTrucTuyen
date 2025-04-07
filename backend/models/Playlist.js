const mongoose = require('mongoose');
const Library = require('./Library');

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
    songs: {
        type: mongoose.Schema.Types.Array,
        default: []
    }
});

playlistSchema.pre('findOneAndDelete', async function(next) {
    try {
        const playlistId = this.getQuery()._id;
        
        await Library.updateMany(
            { 'playlists.playlist_id': playlistId },
            { $pull: { playlists: { playlist_id: playlistId } } }
        );
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Playlist', playlistSchema);