const express = require('express');
const app = express()
const morgan = require('morgan')
const cors = require ('cors')
app.use(cors());
app.use(express.json());


morgan.token('data',(req) =>{
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));


let data = [ 
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) =>{
    response.send("Hello world");
})

app.get('/api/persons', (request, response) => {
    console.log(data);
    response.json(data);

})

app.get('/info', (request, response) => {
    const body =`<div> Phonebook has info for ${data.length} people</div>
                 <div> ${new Date()}</div>`
    response.send(body);
})

app.get('/api/persons/:id', (request, response) =>{
    const person = data.find((item)=> item.id == request.params.id)
    if (!person) {
        console.log("no such entry")
        response.status(204).send();
         
    } else {
    response.json(person);}
})

app.delete('/api/persons/:id', (request, response) => {
    if(data.find((item) => item.id == request.params.id)) {
        data = data.filter(item => item.id !== request.params.id);
        console.log('deleted');
        response.status(204).end();
    } else {
        console.log('no such entry');
        response.status(404).end();
    }

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
    } else if (data.find(item => item.name == newEntry.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })    
    }
    const person = {id: String(getNewUniqueId(newEntry.id || 0)) ,
                    name: newEntry.name, 
                    number: newEntry.number
                    }
    data.push(person)
    console.log('person added')
    response.json(person)
})

app.put('/api/persons/:id', (request, response) =>{
    const updatedPerson = request.body;

    if (data.find(item => item.id == request.params.id)) {
        data = data.map(
            item => item.id == request.params.id 
            ? {name: updatedPerson.name, number: updatedPerson.number, id: request.params.id}
            :item
        );
        response.status(200).json(updatedPerson);
        return;
    }
    response.status(400).end();

})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


