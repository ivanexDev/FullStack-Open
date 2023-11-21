/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect } from 'react'
import './App.css'
import Note from './components/Note'
import { useState } from 'react'

function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => { 
    event.preventDefault()
    const noteObject = { 
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5}

    setNotes([...notes,noteObject])
    setNewNote('')
   }

   const handleNoteChange = (event) => {
    setNewNote(event.target.value)
   }


   const notesToShow = showAll ? notes :  notes.filter(note => note.important)

return (
  <>
  <div>
    <h1>Notes</h1>
    <ul>
      {
        notesToShow.map((note)=> <Note key={note.id} note={note.content} />)
      }
    </ul>
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} type="text" />
      <button type='submit'>save</button>
    </form>
    <button onClick={()=>setShowAll(!showAll)}>Show {showAll ? "important" : "All"}</button>
  </div>
    </>
  )
}

export default App
