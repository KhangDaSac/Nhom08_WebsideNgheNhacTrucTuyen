const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

router.get('/', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
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
});

router.get('/search/', async (req, res) => {
    try {
        const keyword = req.query.keyword || ''; // Lấy keyword từ query

        const artists = await Artist.find({
            "$or": [
                { "artist_name": { "$regex": keyword, "$options": "i" } },
                { "song_id.song_name": { "$regex": keyword, "$options": "i" } }
            ]
        })

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
});

module.exports = router;