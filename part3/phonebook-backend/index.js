const express = require('express');
const app = express()
const morgan = require('morgan')
const cors = require ('cors')
require('dotenv').config();
//console.log(process.env);
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]); // Reqired to resolve DNS issue on windows
const Person = require('./modules/person');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'))

morgan.token('data',(req) =>{
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));



app.get('/', (request, response) =>{
    response.send("Hello world");
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result =>{
        console.log(result);
        response.json(result);
    })


})

app.get('/info', (request, response) => {
    Person.find({}).then(result =>{
        const body =`<div> Phonebook has info for ${result.length} people</div>
                    <div> ${new Date()}</div>`
        response.send(body);
    })

})

app.get('/api/persons/:id', (request, response) =>{
    Person.findById(request.params.id).then(result => {
        console.log(result);
        response.json(result);
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(String(request.params.id))
        .then(result =>{
            console.log(`entry deleted `);
            console.log(result);
            response.status(204).end()
        })
        .catch(error =>{
            next(error);
        })
})



function getNewUniqueId(startId) {
    const MAX_IDS = 9e9;
    const ids = data.map(item => item.id)
    let newId = startId;
    console.log('Generating new id from '+newId)
    while (ids.find(id => id == newId)) {
        newId = Math.floor(Math.random() * MAX_IDS);
        console.log(`NewID ${newId}`);
    }
    return newId;
}

app.post('/api/persons', (request, response) =>{
    const newEntry = request.body;
    
    if(!(newEntry.name && newEntry.number)) {
        return response.status(400).json({ 
            error: 'name or number is missing' 
        })
    }
    Person.find({name: newEntry.name}).then(result => {
        if (result.length > 0){
            return response.status(400).json({ 
                error: 'name must be unique' 
            })   
        } else {
            const newPerson = new Person({
                name: newEntry.name,
                number: newEntry.number,
            });
            newPerson.save().then(result =>{
                console.log('New entry added');
                response.json(result);
            })
        }
    });

})


app.put('/api/persons/:id', (request, response) =>{
    const {name, number} = request.body;

    Person.findById(request.params.id).then((result) =>{
        if (!result.name) response.status(404).end();
        result.number = number;
        result.save().then(()=>{
            response.json(result)
        })
    })

})


const errorHandler = (error, request, response, next) => {
    if (error.name == "CastError") {
        console.log("Invalid ID format");
        response.status(500).end;
    }
    
}

app.use(errorHandler);

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


