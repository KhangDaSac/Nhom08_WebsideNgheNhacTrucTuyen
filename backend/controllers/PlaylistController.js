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

const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
        
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist not found'
            });
        }

        res.json({
            success: true,
            data: playlist
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

const getPlaylistSongs = async (req, res) => {
    try {
        const playlist = await Playlist.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'songs',              
                    localField: 'songs.song_id',      
                    foreignField: '_id',        
                    as: 'songs'                 
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,                   
                    songs: 1
                }
            }
        ]);
        
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist not found'
            });
        }

        console.log(playlist[0].songs);

        res.json({
            success: true,
            data: playlist[0].songs || []
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = {
    createPlaylist,
    getPlaylistById,
    getPlaylistSongs
};