const express = require('express');
const router = express.Router();
const MusicController = require('../controller/MusicController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', MusicController.getAll);
router.get('/:id', MusicController.getById);

module.exports = router;
