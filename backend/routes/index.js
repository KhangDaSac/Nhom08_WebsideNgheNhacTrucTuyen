const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const musicRoutes = require('./musicRoutes');

// Mounting routes
router.use('/api/users', userRoutes);
router.use('/api/music', musicRoutes);

module.exports = router;
