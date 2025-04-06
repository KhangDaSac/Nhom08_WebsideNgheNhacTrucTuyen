const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const mongoose = require('mongoose');


const getAll = async (req, res) => {
    try {
        const artists = await Artist.find()
            .populate('song_id', 'song_name image_url')
            .populate('album_id', 'album_name image_url');
        res.json({
            success: true,
            data: artists
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
        const artist = await Artist.findById(req.params.id)
            .populate('song_id', 'song_name image_url')
            .populate('album_id', 'album_name image_url');
        res.json({
            success: true,
            data: artist
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

        const artists = await Artist.find({
            "$or": [
                { "artist_name": { "$regex": keyword, "$options": "i" } },
                { "songs.song_name": { "$regex": keyword, "$options": "i" } }
            ]
        })
        .populate('song_id', 'song_name image_url')
        .populate('album_id', 'album_name image_url');

        res.json({
            success: true,
            data: artists
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
};

module.exports = {
    getAll,
    getById,
    search
};


