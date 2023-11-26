const express = require("express")
const morgan = require('morgan')
const cors = require("cors")

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323525"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423112"
    }
]

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

morgan.token('body', req =>{
    if(req.method === "POST"){
        return JSON.stringify(req.body)
    }
})

const app =  express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//Persons

app.get("/api/persons", (request, response) =>{
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) =>{
    const id = Number(request.params.id)
    const person = persons.find(person=> person.id === id)

    if(!person){
        return response.status(404).json({message: `La persona con id: ${id} no existe`})
    }
    
    response.json(person)
})

app.delete("/api/persons/:id", (request, response) =>{
    const id = Number(request.params.id)
    const personExist = persons.some(person=> Number(person.id) === Number(id))

    if(!personExist){
        return response.status(404).json({message: `El id: ${id} no existe`})
    }

    persons = persons.filter(person=> person.id != id)

    response.json({message: `La persona con el id: ${id} ha sido eliminada existosamente`})

})

app.post("/api/persons", (request, response)=>{
    const {name,number} = request.body

    const personExist = persons.some(person => person.name === name)

    if(personExist){
        return response.status(409).json({ error: 'Ya exise este nombre'})
    }

    if(!name){
        return response.status(400).json({message: "Name no existe"})
    }

    if(!number){
        return response.status(400).json({message: "Number no existe"})
    }

    const id = Math.floor(Math.random() * 10000)

    const newPerson = {
        id,
        name,
        number
    }
    persons = persons.concat(newPerson)

    response.json(newPerson)
})


//Info

app.get("/info", (request, response) =>{

const peopleCount =  persons.length
const date = new Date().toISOString()
const message = `<p>Phonebook has info for ${peopleCount} people</p>
<p>${date}</p>
`

    response.send(message).end()
})


app.use(unknownEndpoint)

app.listen(3001, ()=>{
    console.log("http://localhost:3001")
})