const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Song = require('./model/Song');
const Artist = require('./model/Artist');
const Album = require('./model/Album');
const MongoConfig = require('./config/MongoConfig');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection


// Routes
app.get('/api/songs', async (req, res) => {
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

app.get('/api/songs/artist=:id', async (req, res) => {
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

app.get('/api/songs/album=:id', async (req, res) => {
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

app.get('/api/artists', async (req, res) => {
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

app.get('/api/artist/:id', async (req, res) => {
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

app.get('/api/albums', async (req, res) => {
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

app.get('/api/albums/artist=:id', async (req, res) => {
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

app.get('/api/album/:id', async (req, res) => {
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

app.get('/api/albums/search/', async (req, res) => {
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

app.get('/api/songs/search/', async (req, res) => {
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

app.get('/api/artists/search/', async (req, res) => {
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




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

