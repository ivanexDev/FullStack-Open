/* eslint-disable react/prop-types */
const Persons = ({renderedPersons}) => {
  return <>{renderedPersons.map((person,index)=> <p key={`${person.name}-${index}`}>{person.name} {person.number}</p>)}</>
  
}

export default Persons