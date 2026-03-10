const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require ('cors')
require('dotenv').config()
//console.log(process.env);
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8']) // Reqired to resolve DNS issue on windows
const Person = require('./modules/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('data',(req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))



app.get('/', (request, response) => {
  response.send('Hello world')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    console.log(result)
    response.json(result)
  })


})

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    const body =`<div> Phonebook has info for ${result.length} people</div>
                    <div> ${new Date()}</div>`
    response.send(body)
  })

})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(result => {
    console.log(result)
    response.json(result)
  })
    .catch(e => next(e))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log('entry deleted ')
      console.log(result)
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})



app.post('/api/persons', (request, response, next) => {
  const newEntry = request.body
  console.log(newEntry)

  if(!(newEntry.name && newEntry.number)) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }
  Person.find({ name: newEntry.name }).then(result => {
    if (result.length > 0){
      return response.status(400).json({
        error: 'name must be unique'
      })
    } else {
      const newPerson = new Person({
        name: newEntry.name,
        number: newEntry.number,
      })
      newPerson.save().then(result => {
        console.log('New entry added')
        response.json(result)
      })
        .catch(error => {
          console.log('error occured on saving')
          next(error)
        })

    }
  })
    .catch( e => {
      console.log('error occured on find')
      next(e)
    })

})


app.put('/api/persons/:id', (request, response, next) => {


  Person.findById(request.params.id).then((result) => {
    console.log(result)
    if (!result) return response.status(404).json({ error: 'NotFound' })
    result.number = request.body.number
    result.save().then(() => {
      response.json(result)
    })
      .catch(error => next(error))
  })
    .catch(error => next(error))

})


const errorHandler = (error, request, response) => {
  console.log('logging New error')
  if (error.name == 'CastError') {
    console.log('Invalid ID format')
    response.status(500).json({ error: 'CastError' })
  } else if(error.name == 'ValidationError') {
    console.log('Validation Error')
    if (error.errors.name) {
      response.status(400).json({ error: 'NameValidationError' })
    } else if (error.errors.number) {
      response.status(400).json({ error: 'NumberValidationError' })
    } else {
      response.status(400).json({ error: 'ValidationError' })
    }
  } else {
    console.log('Unknown error')
    response.status(500).json({ error: 'UnknownError' })
  }

}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


