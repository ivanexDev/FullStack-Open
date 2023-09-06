import PropTypes from "prop-types";

const App = () => {
  // const-definitions
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Header = (props) => {
  return <div>{props.course}</div>;
};

const Content = (props) => {
  return (
    <div>
      <Part
        content={props.parts[0].name}
        exercises={props.parts[0].exercises}
      />
      <Part
        content={props.parts[1].name}
        exercises={props.parts[1].exercises}
      />
      <Part
        content={props.parts[2].name}
        exercises={props.parts[2].exercises}
      />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      Total de ejercicios :
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <h2>{props.content}</h2>
      <span>{props.exercises}</span>
    </div>
  );
};

Header.propTypes = {
  course: PropTypes.string,
};

Content.propTypes = {
  parts: PropTypes.array,
};

Total.propTypes = {
  parts: PropTypes.array,
};

Part.propTypes = {
  content: PropTypes.string,
  exercises: PropTypes.number,
};

export default App;
