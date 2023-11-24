/* eslint-disable react/prop-types */
const Persons = ({renderedPersons, deletePerson}) => {
  return <>{renderedPersons.map((person,index)=> <p key={`${person.name}-${index}`}>{person.name} {person.number} <button onClick={()=>deletePerson(person.id)}>delete</button></p>)}</>
  
}

export default Persons