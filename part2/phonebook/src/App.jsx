import { useState } from 'react'

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

    const verify = persons.some((person)=> person.name === newName)

    if(verify){
      alert(`El nombre: ${newName}  ya existe, ingrese otro.`)
      setNewName("")
      return
    }
    setPersons(persons.concat({name:newName, number: newNumber}))
  }

  const renderdPersons = filter.length === 0 ? persons : persons.filter(({name})=>{
    return name.toLowerCase().includes(filter)})




  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter show with <input value={filter} onChange={({target})=>setFilter(target.value)} type="text" /></div>
      <h2>add a new</h2>
      <form onSubmit={handleNewPerson}>
        <div>name: <input value={newName} onChange={handleName} /></div>
        <div>number: <input value={newNumber} onChange={handleNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

    {renderdPersons.map((person,index)=> <p key={`${person.name}-${index}`}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
