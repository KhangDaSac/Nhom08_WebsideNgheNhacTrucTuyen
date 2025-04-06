const express = require('express');
const router = express.Router();
const AlbumController = require('../controller/AlbumController');

router.get('/search:=keyword', AlbumController.search);
router.get('/artist=:id', AlbumController.getByArtistId);
router.get('/', AlbumController.getAll);
router.get('/:id', AlbumController.getById);

module.exports = router;