const express = require('express');
const router = express.Router();
const PlaylistController = require('../controllers/PlaylistController');

router.post('/create', PlaylistController.createPlaylist);
router.get('/:id', PlaylistController.getPlaylistById);
router.get('/:id/songs', PlaylistController.getPlaylistSongs);

module.exports = router;