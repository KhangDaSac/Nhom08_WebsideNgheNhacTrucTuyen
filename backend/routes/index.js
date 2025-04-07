const songRoutes = require('./songRoutes');
const albumRoutes = require('./albumRoutes');
const artistRoutes = require('./artistRoutes');
const authRoutes = require('./authRoutes');
const libraryRoutes = require('./libraryRoutes');
const express = require('express');
const router = express.Router();

router.use('/api/songs', songRoutes);
router.use('/api/albums', albumRoutes);
router.use('/api/artists', artistRoutes);
router.use('/v1/auth', authRoutes);
router.use('/api/library', libraryRoutes);

module.exports = router;



