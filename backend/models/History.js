const mongoose = require('mongoose');

const historySchema = new Schema({
    histories: [{
        timestamp: {
            type: Date,
            required: true,
            default: Date.now,
        },
        song: {
            type: {
                song_id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Song',
                    required: true,
                },
                song_name: {
                    type: String,
                    required: true,
                },
                image_url: {
                    type: String,
                    required: false,
                },
            },
            required: true,
        },
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('History', historySchema);