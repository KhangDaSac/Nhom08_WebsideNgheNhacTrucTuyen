const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const mongoose = require('mongoose');
const Library = require('../models/Library');

const getPlaylistsByLibraryId = async (req, res) => {   
    try {
        const playlists = await Library.findById({_id: req.params.id }, { playlists: 1 })
            .populate('playlists')
        res.json({
            success: true,
            data: playlists
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: err.message
        });
    }
}

module.exports = {
    getPlaylistsByLibraryId,
};