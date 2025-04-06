const { sendSuccess, sendError } = require('./Controller');
const User = require('../models/User');

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendError(res, 'User already exists', 400);
        }
        
        // Create new user
        const newUser = await User.create({ username, email, password });
        
        return sendSuccess(res, newUser, 'User registered successfully', 201);
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return sendError(res, 'Invalid credentials', 401);
        }
        
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return sendError(res, 'Invalid credentials', 401);
        }
        
        // Generate token
        const token = user.generateAuthToken();
        
        return sendSuccess(res, { user, token }, 'Login successful');
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        
        return sendSuccess(res, user);
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function getAll(req, res) {
    try {
        const users = await User.find().select('-password');
        return sendSuccess(res, users);
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function getById(req, res) {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        
        return sendSuccess(res, user);
    } catch (error) {
        return sendError(res, error.message);
    }
}

module.exports = {
    register,
    login,
    getProfile,
    getAll,
    getById
};
