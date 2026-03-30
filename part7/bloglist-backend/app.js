const express = require('express');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const middleware = require ('./utils/middleware')
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])
require('dotenv').config()

const app = express()
app.use(express.json());
app.use(middleware.tokenExtractor);

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(e => {
        console.log('Could not connect to database');
        console.log(e);
    })





app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV == 'test'){
    console.log('TEST MODE , reset plugged in')
    app.use('/api/reset', require('./controllers/reset'));
    
}

app.use(middleware.errorHandler)



module.exports = app