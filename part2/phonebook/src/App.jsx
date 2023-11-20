import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }]) 
  const [ newName, setNewName ] = useState('')

  const handleName = (event)=>{
    setNewName(event.target.value)
  }

  const handleNewPerson = (event)=>{
    event.preventDefault()
    setPersons(persons.concat({name:newName}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    { persons.map((person,index)=> <p key={`${person.name}-${index}`}>{person.name}</p>) }
    </div>
  )
}

export default App
