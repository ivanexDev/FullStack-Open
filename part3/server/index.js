require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')
const cors = require('cors')

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const generateId = () => {
const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
return maxId + 1
}


  app.use(cors())
  app.use(express.static("build"))
  app.use(express.json())
  app.use(requestLogger)


  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })
  
  app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.findById(id).then( note =>{
      response.json(note)
    }).catch(err=> response.json({message: `El id: ${id} no existe en la base de datos`}))

    // const id = Number(request.params.id)
    // const note = notes.find(note=> note.id === id)
    // if (note){
    //     response.json(note)
    // } else {
    //     response.status(404).json({
    //         response: `No existe nota con id: ${id}`
    //     })
    // }
  })

  app.post('/api/notes', (request, response)=>{
    const body = request.body
    if(!body.content){
        return response.status(400).json({
            error: "conten missing"
        })
        
    }

    const note = new Note({
        content : body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote=>{
      response.json(savedNote)
    })
  })

  app.delete('/api/notes/:id',(request, response)=>{

    const id = Number(request.params.id)
    notes = notes.filter(note=> note.id != id)

    console.log(notes)

    response.status(200).json({ message: " note deleted "})


  })


  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })