const express = require('express');
const router = express.Router();
const SongController = require('../controllers/SongController');

router.get('/search', SongController.search);
router.get('/', SongController.getAll);
router.get('/artist=:id', SongController.getByArtistId);
router.get('/album=:id', SongController.getByAlbumId);


module.exports = router;
