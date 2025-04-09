require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Library = require('../models/Library');


const JWT_SECRET = process.env.JWT_SECRET || '';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({
            email: email
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }


        const token = jwt.sign(
            { _id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );


        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user
        });



    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

const register = async (req, res) => {
    try {
        const {
            email,
            password,
            phone,
            display_name
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newlibrary = new Library(
            {
                playlists: [],
                artists_followed: [],
                songs_liked: [],
                albums_liked: []
            }
        )

        const library = await newlibrary.save();

        const newUser = new User({
            email,
            password_hash: hashedPassword,
            phone,
            display_name,
            library_id: library._id
        });


        const user = await newUser.save();

        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};



module.exports = { login, register };