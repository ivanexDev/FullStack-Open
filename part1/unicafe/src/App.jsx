/* eslint-disable react/prop-types */

import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avarage = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" state={good} />
        <StatisticLine text="Neutral" state={neutral} />
        <StatisticLine text="Bad" state={bad} />
        <StatisticLine text="All" state={all} />
        <StatisticLine text="Avarage" state={avarage} />
        <StatisticLine text="Positive" state={positive} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, state }) => {
  if (text === "Positive") {
    return (
      <>
        <tr>
          <td>{text}:</td>

          <td>{state} %</td>
        </tr>
      </>
    );
  }

  return (
    <>
      <tr>
        <td>{text}:</td>

        <td>{state}</td>
      </tr>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={() => handleClick(text)}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value) => {
    if (value === "Good") {
      setGood(good + 1);
    }
    if (value === "Neutral") {
      setNeutral(neutral + 1);
    }
    if (value === "Bad") {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClick} text="Good" />
      <Button handleClick={handleClick} text="Neutral" />
      <Button handleClick={handleClick} text="Bad" />
      <h2>Statics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
