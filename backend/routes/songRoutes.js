const express = require('express');
const router = express.Router();
const SongController = require('../controllers/SongController');

router.get('/search', SongController.search);
router.get('/', SongController.getAll);
router.get('/artist=:id', SongController.getByArtistId);
router.get('/album=:id', SongController.getByAlbumId);
router.post('/addToPlaylist', SongController.addToPlaylist);
router.get('/:id', SongController.getById);
router.delete('/delete/:id', SongController.deleteSong);
router.post('/add', SongController.addSong);


module.exports = router;
