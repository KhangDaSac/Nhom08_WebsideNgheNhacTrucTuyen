const express = require('express');
const router = express.Router();
const LibraryController = require('../controllers/LibraryController');

router.get('/playlists/:id', LibraryController.getPlaylistsByLibraryId);

module.exports = router;
