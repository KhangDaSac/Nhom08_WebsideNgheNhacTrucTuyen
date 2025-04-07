const express = require('express');
const router = express.Router();
const LibraryController = require('../controllers/LibraryController');

router.get('/playlists/:id', LibraryController.getPlaylistsByLibraryId);
// router.delete('/:library_id/playlists/:playlist_id', LibraryController.deletePlaylist);

module.exports = router;
