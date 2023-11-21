import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState("")

  const handleName = (event)=>{
    setNewName(event.target.value)
  }
  const handleNumber = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleNewPerson = (event)=>{
    event.preventDefault()

    const verify = persons.some((person)=> person.name.toLowerCase() === newName.toLowerCase())

    if(verify){
      alert(`El nombre: ${newName}  ya existe, ingrese otro.`)
      setNewName("")
      return
    }
    setPersons(persons.concat({name:newName, number: newNumber}))
  }

  const renderedPersons = filter.length === 0 ? persons : persons.filter(({name})=>{
    return name.toLowerCase().includes(filter)})




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm handleNewPerson={handleNewPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
      <h3>Numbers</h3>
      <Persons renderedPersons={renderedPersons} />
    </div>
  )
}

export default App
