require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')
const cors = require('cors')

const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


// Midlerwares

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(logger)


//Routes

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  // if (!body.content) {
  //   return response.status(400).json({
  //     error: "conten missing",
  //   });
  // }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then(savedNote => savedNote.toJSON())
    .then((savedAndFormatedNote) => {
      response.json(savedAndFormatedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id',(request,response, next) => {
  const id = request.params.id
  const { content, important } =  request.body

  Note.findByIdAndUpdate(id,{ content,important },{ new:true })
    .then(updatedNote => response.json(updatedNote))
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndDelete(id).then(() => response.status(204).end()).catch(err => next(err))

  // notes = notes.filter((note) => note.id != id);

  // console.log(notes);

  // response.status(200).json({ message: " note deleted " });
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
