import PropTypes from "prop-types";

const App = () => {
  // const-definitions
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };

  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };

  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

const Header = (props) => {
  return <div>{props.course}</div>;
};

const Content = (props) => {
  return (
    <div>
      <Part content={props.part1.name} exercises={props.part1.exercises} />
      <Part content={props.part2.name} exercises={props.part2.exercises} />
      <Part content={props.part3.name} exercises={props.part3.exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      Total de ejercicios :
      {props.exercises1 + props.exercises2 + props.exercises3}
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
  part1: PropTypes.object,
  part2: PropTypes.object,
  part3: PropTypes.object,
};

Total.propTypes = {
  exercises1: PropTypes.number,
  exercises2: PropTypes.number,
  exercises3: PropTypes.number,
};

Part.propTypes = {
  content: PropTypes.string,
  exercises: PropTypes.number,
};

export default App;
