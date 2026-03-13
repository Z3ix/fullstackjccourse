const express = require('express');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])
require('dotenv').config()

const app = express()



mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(e => {
        console.log('Could not connect to database');
        console.log(e);
    })

app.use(express.json())

app.use('/api/blogs', blogsRouter)



module.exports = app