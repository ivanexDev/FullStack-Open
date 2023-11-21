import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', number: "040-1234567" }]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleName = (event)=>{
    setNewName(event.target.value)
  }
  const handleNumber = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleNewPerson = (event)=>{
    event.preventDefault()

    const verify = persons.some((person)=> person.name === newName)

    if(verify){
      alert(`El nombre: ${newName}  ya existe, ingrese otro.`)
      setNewName("")
      return
    }
    setPersons(persons.concat({name:newName, number: newNumber}))
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>name: <input value={newName} onChange={handleName} /></div>
        <div>number: <input value={newNumber} onChange={handleNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    { persons.map((person,index)=> <p key={`${person.name}-${index}`}>{person.name} {person.number}</p>) }
    </div>
  )
}

export default App
