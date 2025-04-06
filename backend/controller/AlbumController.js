const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
    try {
        const albums = await Album.find()
            .populate('song_id', 'song_name image_url')
            .populate('artist_id', 'artist_name image_url');
        res.json({
            success: true,
            data: albums
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id)
            .populate('song_id', 'song_name image_url')
            .populate('artist_id', 'artist_name image_url');
        res.json({
            success: true,
            data: album
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
    console.log("hello");
    try {
        const albums = await Album.find({ "artists._id": new mongoose.Types.ObjectId(req.params.id) })
            .populate('song_id', 'song_name image_url')
            .populate('artist_id', 'artist_name image_url');
        res.json({
            success: true,
            data: albums
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
        const albums = await Album.find({
            "$or": [
                { "album_name": { "$regex": keyword, "$options": "i" } },
                { "artists.artist_name": { "$regex": keyword, "$options": "i" } }
            ]
        })
            .populate('song_id', 'song_name image_url')
            .populate('artist_id', 'artist_name image_url');

        res.json({
            success: true,
            data: albums
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
    getById,
    getByArtistId,
    search
};

