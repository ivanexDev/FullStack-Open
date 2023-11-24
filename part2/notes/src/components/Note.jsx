/* eslint-disable react/prop-types */
const Note = ({note, toggleImportance})=>{
  const label = note.important.toString()
    return (
      <li className="note">{note.content}
        <button onClick={()=>toggleImportance(note.id)}>{label}</button>
      </li>
    )
  }

export default Note