const mongoose = require('mongoose')


const connectToDatabase = async (uri) => {
    console.log('connecting to database URI:', uri)
   
    try {
        mongoose.connect(uri)
        console.log('connected to MongoDB')
    } catch (e) {
        console.log('error connection to MongoDB:', error.message)
        process.exit(1)

    }
}

module.exports = connectToDatabase