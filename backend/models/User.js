const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    admin: {
        type: Boolean,
        default: false
    },
    avatar_url: {
        type: String,
        default: 'https://res.cloudinary.com/dkh3af36d/image/upload/v1744029008/images/s3ylrplne8en81goxma4.jpg'
    },
    password_hash: {
        type: String,
        required: true
    },
    library_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library'
    },
    history_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History'
    }
});

module.exports = mongoose.model('User', userSchema); 