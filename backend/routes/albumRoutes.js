const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/AlbumController');

router.get('/search', AlbumController.search);
router.get('/artist=:id', AlbumController.getByArtistId);
router.get('/', AlbumController.getAll);
router.get('/:id', AlbumController.getById);

module.exports = router;