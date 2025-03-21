const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const mongoose = require('mongoose');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await Account.findOne({ email, password });
    res.status(200).json({
        success: true,
        data: user
    });
});

module.exports = router;