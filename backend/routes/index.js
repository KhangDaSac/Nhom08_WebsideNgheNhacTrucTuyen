const songRoutes = require('./songRoutes');
const albumRoutes = require('./albumRoutes');
const artistRoutes = require('./artistRoutes');
const authRoutes = require('./authRoutes');
const libraryRoutes = require('./libraryRoutes');
const playlistRoutes = require('./playlistRoutes');
const express = require('express');
const router = express.Router();

router.use('/api/songs', songRoutes);
router.use('/api/albums', albumRoutes);
router.use('/api/artists', artistRoutes);
router.use('/v1/auth', authRoutes);
router.use('/api/libraries', libraryRoutes);
router.use('/api/playlists', playlistRoutes);

module.exports = router;



