const express = require("express")

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

const app =  express()

app.use(express.json())

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

app.listen(3001, ()=>{
    console.log("http://localhost:3001")
})