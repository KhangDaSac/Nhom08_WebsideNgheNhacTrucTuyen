const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    display_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    password_hash: {
        type: String,
        required: true
    },
    library_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library'
    }
});

module.exports = mongoose.model('User', accountSchema); 