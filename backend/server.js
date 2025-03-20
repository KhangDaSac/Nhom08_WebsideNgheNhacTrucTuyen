const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Song = require('./model/Song');
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

