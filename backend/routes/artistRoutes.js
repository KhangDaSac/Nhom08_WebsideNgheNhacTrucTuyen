const express = require('express');
const router = express.Router();
const ArtistController = require('../controller/ArtistController');

router.get('/search=:keyword', ArtistController.search);
router.get('/', ArtistController.getAll);
router.get('/:id', ArtistController.getById);


module.exports = router;
