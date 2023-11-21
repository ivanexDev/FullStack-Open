/* eslint-disable react/prop-types */
const PersonForm = ({handleName, newName, handleNewPerson, newNumber, handleNumber}) => {
  return (
    <form onSubmit={handleNewPerson}>
    <div>name: <input value={newName} onChange={handleName} /></div>
    <div>number: <input value={newNumber} onChange={handleNumber} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm