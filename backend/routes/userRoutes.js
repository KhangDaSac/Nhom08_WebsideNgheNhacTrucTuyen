const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Protected routes
router.get('/profile', auth, UserController.getProfile);
router.get('/', auth, UserController.getAll);
router.get('/:id', auth, UserController.getById);

module.exports = router;
