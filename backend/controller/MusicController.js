const { sendSuccess, sendError } = require('./Controller');
const Music = require('../models/Music');

async function getAll(req, res) {
    try {
        const music = await Music.find();
        return sendSuccess(res, music);
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function getById(req, res) {
    try {
        const music = await Music.findById(req.params.id);
        if (!music) {
            return sendError(res, 'Music not found', 404);
        }
        
        return sendSuccess(res, music);
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function create(req, res) {
    try {
        const { title, artist, album, genre, url, coverImage } = req.body;
        
        const newMusic = await Music.create({
            title, artist, album, genre, url, coverImage
        });
        
        return sendSuccess(res, newMusic, 'Music added successfully', 201);
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function update(req, res) {
    try {
        const updates = req.body;
        const music = await Music.findByIdAndUpdate(
            req.params.id, 
            updates,
            { new: true, runValidators: true }
        );
        
        if (!music) {
            return sendError(res, 'Music not found', 404);
        }
        
        return sendSuccess(res, music, 'Music updated successfully');
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function remove(req, res) {
    try {
        const music = await Music.findByIdAndDelete(req.params.id);
        
        if (!music) {
            return sendError(res, 'Music not found', 404);
        }
        
        return sendSuccess(res, null, 'Music deleted successfully');
    } catch (error) {
        return sendError(res, error.message);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
