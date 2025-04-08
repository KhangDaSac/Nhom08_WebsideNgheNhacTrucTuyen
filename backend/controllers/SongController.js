const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Playlist = require('../models/Playlist');
const Library = require('../models/Library');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
    try {
        const songs = await Song.find()
            .populate('artist_id', 'artist_name image_url')
            .populate('album_id', 'album_name image_url');
        res.json({
            success: true,
            data: songs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
}

const getByArtistId = async (req, res) => {
    try {
        const songs = await Song.find({ "artists._id": new mongoose.Types.ObjectId(req.params.id) })
            .populate('artist_id', 'artist_name image_url')
            .populate('album_id', 'album_name image_url');
        res.json({
            success: true,
            data: songs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
}


const getByAlbumId = async (req, res) => {
    try {
        const songs = await Song.find({ "album_id": new mongoose.Types.ObjectId(req.params.id) })
            .populate('artist_id', 'artist_name image_url')
            .populate('album_id', 'album_name image_url');
        res.json({
            success: true,
            data: songs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
}



const search = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const songs = await Song.find({
            "$or": [
                { "song_name": { "$regex": keyword, "$options": "i" } },
                { "artists.artist_name": { "$regex": keyword, "$options": "i" } }
            ]
        })
            .populate('artist_id', 'artist_name image_url');

        res.json({
            success: true,
            data: songs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
}

const addToPlaylist = async (req, res) => {
    try {
        const { song_id, playlist_id } = req.body;
        const playlist = await Playlist.findById(playlist_id);

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist not found'
            });
        }
        const song = await Song.findById(song_id);

        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Song not found'
            });
        }

        playlist.songs.push({
            song_id: song._id,
            song_name: song.song_name,
            image_url: song.image_url
        });

        let newImageUrl = "https://photo-zmp3.zmdcdn.me/album_default.png";
        if (playlist.songs.length > 0) {
            newImageUrl = playlist.songs[0].image_url;
        }

        if (playlist.image_url !== newImageUrl) {
            playlist.image_url = newImageUrl;
            await Library.updateOne(
                { "playlists.playlist_id": playlist_id },
                { 
                    $set: { 
                        "playlists.$.image_url": newImageUrl 
                    }
                }
            );
        }

        await playlist.save();

        res.json({ success: true, message: 'Song added to playlist' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

const getById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id)
            .populate('artist_id', 'artist_name image_url')
            .populate('album_id', 'album_name image_url');
        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Song not found'
            });
        }
        res.json({
            success: true,
            data: song
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
}

module.exports = {
    getAll,
    getByArtistId,
    getByAlbumId,
    search,
    addToPlaylist,
    getById
};
