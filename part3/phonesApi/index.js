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

app.get("/api/persons", (request, response) =>{
    response.json(persons)
})

app.listen(3001, ()=>{
    console.log("http://localhost:3001")
})