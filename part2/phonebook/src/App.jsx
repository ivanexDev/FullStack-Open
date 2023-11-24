import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import { useEffect } from 'react'
import phoneServices from "./services/phones"

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

useEffect(()=>{
  phoneServices.getAll().then((res)=>setPersons(res))
},[])



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
      if(confirm(`${newName} ya existe, desea cambiar su numero telefonico?`)){

        const contact = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const changedNumber = {...contact, number: newNumber}

        phoneServices.updatePhone(changedNumber.id,changedNumber).then(res=> console.log(res))
        setPersons(persons.map(person => person.name === newName ? changedNumber : person))
        
        setNewName("")
        setNewNumber("")
        return
      }
      return
    }

    const newContact = {name:newName, number: newNumber}

    phoneServices.create(newContact).then(res=>{
      console.log(res)
      setPersons(persons.concat(res))})

    
  }

  const deletePerson = (id)=>{
    if(confirm("Esta seguro que quiere eliminarlo?"))
   { phoneServices.deleteContact(id).then(res=>console.log(res))
    setPersons(persons.filter((person)=> person.id != id))}
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
      <Persons renderedPersons={renderedPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
