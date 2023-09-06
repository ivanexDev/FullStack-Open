import PropTypes from "prop-types";

const App = () => {
  // const-definitions
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
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
      <Part content={props.part1} exercises={props.exercises1} />
      <Part content={props.part2} exercises={props.exercises2} />
      <Part content={props.part3} exercises={props.exercises3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      Total de ejercicios :{" "}
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
  part1: PropTypes.string,
  exercises1: PropTypes.number,
  part2: PropTypes.string,
  exercises2: PropTypes.number,
  part3: PropTypes.string,
  exercises3: PropTypes.number,
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
