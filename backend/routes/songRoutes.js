const express = require('express');
const router = express.Router();
const SongController = require('../controller/SongController');

router.get('/search=:keyword', SongController.search);
router.get('/', SongController.getAll);
router.get('/artist=:id', SongController.getByArtistId);
router.get('/album=:id', SongController.getByAlbumId);


module.exports = router;
