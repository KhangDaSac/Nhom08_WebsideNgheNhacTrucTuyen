const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Library = require('../models/Library');
const Playlist = require('../models/Playlist');
const mongoose = require('mongoose');

const createPlaylist = async (req, res) => {
    const { playlist_name, library_id} = req.body;

    try {
        const newPlaylist = new Playlist({
            playlist_name
        });

        await newPlaylist.save();

        const library = await Library.findById(library_id);
        library.playlists.push({
            playlist_id: newPlaylist._id,
            playlist_name: newPlaylist.playlist_name,
            image_url: newPlaylist.image_url
        });

        await library.save();
        res.status(201).json({
            success: true,
            message: 'Playlist created successfully',
            data: newPlaylist,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
}

module.exports = {
    createPlaylist,
};