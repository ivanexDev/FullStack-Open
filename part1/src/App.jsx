/* eslint-disable react/prop-types */

import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avarage = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <p>All: {all}</p>
      <p>Avarage: {avarage}</p>
      <p>Positive: {positive}</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value) => {
    if (value === "good") {
      setGood(good + 1);
    }
    if (value === "neutral") {
      setNeutral(neutral + 1);
    }
    if (value === "bad") {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => handleClick("good")}>Good</button>
      <button onClick={() => handleClick("neutral")}>Neutral</button>
      <button onClick={() => handleClick("bad")}>Bad</button>
      <h2>Statics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
