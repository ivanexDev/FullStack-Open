/* eslint-disable react/prop-types */

import { useState } from "react";

const AnecdoteContainer = ({ anecdotes, points }) => {
  return (
    <>
      <p>{anecdotes}</p>
      <p>has {points} votes</p>
    </>
  );
};

const Anecdotes = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

  const random = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handlePoints = () => {
    setPoints((prevState) => {
      const copy = [...prevState];
      copy[selected] += 1;
      return copy;
    });
  };

  const everyZero = points.every((point) => point === 0);

  const mostVotes = points.indexOf(Math.max(...points));

  return (
    <div>
      <AnecdoteContainer
        anecdotes={anecdotes[selected]}
        points={points[selected]}
      />
      <button onClick={handlePoints}>vote</button>
      <button onClick={random}>New anecdote</button>
      {everyZero ? null : (
        <p>Anecdote with most votes: {anecdotes[mostVotes]}</p>
      )}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const App = () => {
  return <Anecdotes anecdotes={anecdotes} />;
};

export default App;
