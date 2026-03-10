
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
  name: {
    type: String,
    minLength: 3,
    required: true,
    },
  number: {
    type: String,
    validate: {
        validator: function (v) {
            return /^(\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(v);
        },
        message: "Number validation failed"
    },
    }
});

personSchema.set('toJSON', {
    transform: (document, response) => {
        response.id = response._id.toString();
        delete response._id;
        delete response.__v;
    }
})

module.exports = mongoose.model('Person', personSchema);