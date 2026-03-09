
const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect(process.env.MANGO_URL,{family: 4})  
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
    transform: (document, response) => {
        response.id = response._id.toString();
        delete response._id;
        delete response.__v;
    }
})

module.exports = mongoose.model('Person', personSchema);