const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const MongoConfig = require('./config/MongoConfig');
const Song = require('./model/Song');

const app = express();



app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.create({
      song_name: 'Song 1',
      likes: 100,
      views: 100,
      genres: ['Pop', 'Rock'],
      release_date: new Date(),
      image_url: 'https://example.com/song1.jpg',
      audio_url: 'https://example.com/song1.mp3'
    });
    res.json(songs);
  } catch (err) {
    res.status(500).json({  
      success: false,
      message: 'Lỗi server',
      error: err.message
    });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

