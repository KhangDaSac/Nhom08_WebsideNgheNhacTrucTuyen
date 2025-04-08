const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const mongoose = require('mongoose');
const Library = require('../models/Library');

const getLibraryById = async (req, res) => {
    try {
        const playlists = await Library.findById({ _id: req.params.id }, 
            { playlists: 1, artists_followed: 1, songs_liked: 1, albums_liked: 1 })
        res.json({
            success: true,
            data: playlists
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
}

const likeSong = async (req, res) => {
    try {
        const libraryId = req.params.id;
        const songId = req.body.song_id;
        const like = req.body.like;
        
        const library = await Library.findById(libraryId);
        if (!library) {
            return res.status(404).json({ success: false, message: 'Library not found' });
        }

        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        if(like) {
            library.songs_liked.push({
                song_id: songId,
                song_name: song.song_name,
                artists: song.artists,
                audio_url: song.audio_url,
                image_url: song.image_url
            });
        }else {
            library.songs_liked = library.songs_liked.filter(s => s.song_id.toString() !== songId);
        }
        
        await library.save();

        res.json({ success: true, message: 'Song liked successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

module.exports = {
    getLibraryById,
};