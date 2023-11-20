/* eslint-disable react/prop-types */
const Course = ({course}) => {
  return (
    <>
    <header>
    <h1>{course.name}</h1>
    </header>
    {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}

    </>
  )
}

export default Course