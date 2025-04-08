const express = require('express');
const router = express.Router();
const LibraryController = require('../controllers/LibraryController');

router.get('/:id', LibraryController.getLibraryById);

module.exports = router;
