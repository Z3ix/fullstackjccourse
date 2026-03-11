const express = require('express');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])
require('dotenv').config()

const app = express()



mongoose.connect(process.env.BLOGLISTDB_URL, { family: 4 })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(e => {
        console.log('Could not connect to database');
        console.log(e);
    })

app.use(express.json())

app.use('/api/blogs', blogsRouter)


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

