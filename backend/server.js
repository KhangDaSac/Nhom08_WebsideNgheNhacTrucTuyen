const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Song = require('./models/Song');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const MongoConfig = require('./config/MongoConfig');
const router = require('./routers/index');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

