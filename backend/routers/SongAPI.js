const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
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
});

router.get('/artist=:id', async (req, res) => {
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
});

router.get('/album=:id', async (req, res) => {
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
});

router.get('/search/', async (req, res) => {
    try {
      const keyword = req.query.keyword || ''; // Lấy keyword từ query
  
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
  });

module.exports = router;