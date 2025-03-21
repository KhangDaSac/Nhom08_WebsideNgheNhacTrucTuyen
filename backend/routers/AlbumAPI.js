const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const mongoose = require('mongoose');
const Song = require('../models/Song');
const Artist = require('../models/Artist');

router.get('/', async (req, res) => {
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
});

router.get('/artist=:id', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
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
});

router.get('/search/', async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
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
});

module.exports = router;