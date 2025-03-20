const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Song = require('../model/Song');
// const Artist = require('../model/Artist');
// const Album = require('../model/Album');

require('dotenv').config();

async function importSongs() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Read songs.json file
        const songsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../data/songs.json'), 'utf-8')
        );

        for (const songData of songsData) {
            // Create or find artist
            // let artist = await Artist.findOne({ artist_name: songData.artist_name });
            // if (!artist) {
            //     artist = await Artist.create({
            //         artist_name: songData.artist_name,
            //         image_url: songData.artist_image
            //     });
            // }

            // Create or find album if it exists
            // let album = null;
            // if (songData.album_name) {
            //     album = await Album.findOne({ album_name: songData.album_name });
            //     if (!album) {
            //         album = await Album.create({
            //             album_name: songData.album_name,
            //             release_date: songData.release_date,
            //             image_url: songData.album_image,
            //             artists: [artist._id]
            //         });
            //     }
            // }

            // Create song
            const song = await Song.create({
                song_name: songData.song_name,
                artist_id: artist._id,
                album_id: album ? album._id : null,
                genres: songData.genres || [],
                release_date: songData.release_date,
                audio_url: songData.audio_url,
                image_url: songData.image_url,
                lyrics: songData.lyrics
            });

            // Update artist's songs array
            // await Artist.findByIdAndUpdate(
            //     artist._id,
            //     { $addToSet: { songs: song._id } }
            // );

            // // Update album's songs array if album exists
            // if (album) {
            //     await Album.findByIdAndUpdate(
            //         album._id,
            //         { $addToSet: { songs: song._id } }
            //     );
            // }

            console.log(`Imported song: ${songData.song_name}`);
        }

        console.log('All songs imported successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error importing songs:', error);
        process.exit(1);
    }
}

importSongs(); 