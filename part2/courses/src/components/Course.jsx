/* eslint-disable react/prop-types */
const Course = ({ course }) => {
  const total = course.parts.reduce((sum, value) => sum + value.exercises, 0);

  return (
    <>
      <header>
        <h1>{course.name}</h1>
      </header>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p>
        <strong>Total of {total} excercises</strong>
      </p>
    </>
  );
};

export default Course;
