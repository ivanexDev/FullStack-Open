const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phone = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

morgan.token('body', req => {
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
})

const app =  express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//Persons

app.get('/api/persons', (request, response) => {
  Phone.find({}).then(res => {
    response.json(res)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phone.findById(id).then(person => {
    console.log(person)
    if(!person){
      return response.status(404).json({ message: `La persona con id: ${id} no existe` })
    }
    response.json(person)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Phone.findByIdAndDelete(id).then(() => response.status(204).end()).catch(err => next(err))

})

app.post('/api/persons', (request, response, next) => {
  const { name,number } = request.body
  const newPerson = new Phone({
    name,
    number: number.toString()
  })

  Phone.findOne({ name }).then(personExist => {
    if(!personExist){
      newPerson
        .save()
        .then(formatedPerson => response.json(formatedPerson))
        .catch(error => next(error))
    } else{
      response.status(409).json({ message: `El nombre ${name} ya existe en la base de datos` })
    }
  })

})

app.put('/api/persons/:id',(request, response, next) => {
  const id = request.params.id

  const { number } = request.body

  Phone.findByIdAndUpdate(id,{ number },{ new:true }).then(updatedPerson => response.json(updatedPerson)).catch(error => next(error))
})


//Info

app.get('/info', (request, response) => {

  Phone.find({}).then(count => {

    const date = new Date().toISOString()
    const message = `<p>Phonebook has info for ${count.length} people</p>
  <p>${date}</p>
  `

    response.send(message).end()

  })

})


app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
