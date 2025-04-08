const express = require('express');
const router = express.Router();
const LibraryController = require('../controllers/LibraryController');

router.get('/:id', LibraryController.getLibraryById);
router.post('/:id/likeSong', LibraryController.likeSong);

module.exports = router;
