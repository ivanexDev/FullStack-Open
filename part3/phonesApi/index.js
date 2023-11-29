const express = require("express")
const morgan = require('morgan')
const cors = require("cors")
const Phone = require("./models/person")

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
    } 
  
    next(error)
  }

morgan.token('body', req =>{
    if(req.method === "POST"){
        return JSON.stringify(req.body)
    }
})

const app =  express()
app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//Persons

app.get("/api/persons", (request, response) =>{
    Phone.find({}).then(res=>{
        response.json(res)
    })
})

app.get("/api/persons/:id", (request, response) =>{
    const id = Number(request.params.id)
    const person = persons.find(person=> person.id === id)

    if(!person){
        return response.status(404).json({message: `La persona con id: ${id} no existe`})
    }
    
    response.json(person)
})

app.delete("/api/persons/:id", (request, response, next) =>{
    const id = request.params.id

    Phone.findByIdAndDelete(id).then(res=> response.status(204).end()).catch(err=> next(err))

})

app.post("/api/persons", (request, response)=>{
    const {name,number} = request.body

    // const personExist = persons.some(person => person.name === name)

    // if(personExist){
    //     return response.status(409).json({ error: 'Ya exise este nombre'})
    // }

    if(!name){
        return response.status(400).json({message: "Name no existe"})
    }

    if(!number){
        return response.status(400).json({message: "Number no existe"})
    }

    const newPerson = new Phone({
        name,
        number
    })

    newPerson.save().then(person=>{
      response.json(person)
    })
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
app.use(errorHandler)

app.listen(3001, ()=>{
    console.log("http://localhost:3001")
})
