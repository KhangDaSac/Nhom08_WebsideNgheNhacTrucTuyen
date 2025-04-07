const express = require('express');
const router = express.Router();
const PlaylistController = require('../controllers/PlaylistController');

router.post('/create', PlaylistController.createPlaylist);

module.exports = router;