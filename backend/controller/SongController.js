const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
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
        const keyword = req.params.keyword || ''; 
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

module.exports = {
    getAll,
    getByArtistId,
    getByAlbumId,
    search
};
