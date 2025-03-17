const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const MongoConfig = require('./config/MongoConfig');
const Songs = require('./model/Songs');

const app = express();



app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Songs.create({
      title: 'Song 1',
      artist_id: ['1', '2'],
      album_id: '1',
      duration: 180,
      genre: ['Pop', 'Rock'],
      releaseDate: new Date(),
      likes: 100,
      audioUrl: 'https://example.com/song1.mp3',
      imageUrl: 'https://example.com/song1.jpg'
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

