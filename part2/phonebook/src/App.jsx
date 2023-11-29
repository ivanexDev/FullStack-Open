import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import { useEffect } from 'react'
import phoneServices from "./services/phones"
import Notification from './components/Notification'
import "./App.css"

const App = () => {
  const [ persons, setPersons ] = useState([]) 

useEffect(()=>{
  phoneServices.getAll().then((res)=>setPersons(res))
},[])



  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState("")
  const [confirmMessage, setConfirmMessage] = useState(null)

  const sendConfirmMessage = (confirm, message)=>{
    setConfirmMessage(
      confirm === "confirm"? `Added ${newName}` : message
    )
    setTimeout(() => {
      setConfirmMessage(null)
    }, 5000)
  }

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

        phoneServices.updatePhone(changedNumber.id,changedNumber)
        .then(()=> {setPersons(persons.map(person => person.name === newName ? changedNumber : person))})
        .catch(error=>{
          console.log(error)
          sendConfirmMessage("error")
          setPersons(persons.filter((person)=> person.name != newName))
        } )
         
        setNewName("")
        setNewNumber("")
        return
      }
      return
    }

    const newContact = {name:newName, number: newNumber}

    phoneServices.create(newContact).then(res=>{
      // console.log(res)
      sendConfirmMessage("confirm")
      setPersons(persons.concat(res))}).catch(error=> {
        console.log(error)
        sendConfirmMessage("error", error.response.data.error)
      })

    
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
      <Notification message={confirmMessage}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm handleNewPerson={handleNewPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
      <h3>Numbers</h3>
      <Persons renderedPersons={renderedPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
