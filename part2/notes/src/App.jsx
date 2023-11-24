/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import './App.css'
import Note from './components/Note'
import { useState } from 'react'
import noteService from "./services/notes"

function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  const addNote = (event) => { 
    event.preventDefault()
    const noteObject = { 
      // id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5}
      noteService
      .create(noteObject)
        .then(res=> {
          console.log(res)
          setNotes([...notes,res])
          setNewNote('')
        })


   }

   const handleNoteChange = (event) => {
    setNewNote(event.target.value)
   }

   const toggleImportance = (id)=>{
    const note = notes.find((n)=> n.id === id)
    const changedNote = {...note, important: !note.important}
  noteService
    .update(id, changedNote )
      .then(res=> {
        setNotes(notes.map((note)=> note.id != id ? note : res))})
      .catch(() =>{
        alert(`La nota ${note.content}, ya no existe en la base de datos.`)
        setNotes(notes.filter((n)=>n.id != id))
      })
   }


   const notesToShow = showAll ? notes :  notes.filter(note => note.important)

return (
  <>
  <div>
    <h1>Notes</h1>
    <ul>
      {
        notesToShow.map((note)=> <Note key={note.id} note={note} toggleImportance={toggleImportance}/>)
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
