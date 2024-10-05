import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import your CSS

// Main Component (App-like structure within index.js)
const GuessGame = () => {
  const [randomNumber, setRandomNumber] = useState(Math.trunc(Math.random() * 20 + 1));
  const [gameScore, setGameScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('Start guessing...');
  const [correctGuess, setCorrectGuess] = useState(false);

  const checkGuess = () => {
    const guessedNumber = Number(inputValue);

    if (!guessedNumber) {
      setMessage('Please enter a valid number 🤦‍♀️');
    } else if (guessedNumber !== randomNumber) {
      if (gameScore > 1) {
        setMessage(guessedNumber > randomNumber ? 'Too high!' : 'Too low!');
        setGameScore(gameScore - 1);
      } else {
        setMessage('You lost the game!');
        setGameScore(0);
      }
    } else {
      setMessage('You are correct!');
      setCorrectGuess(true);  // Mark correct guess
      if (gameScore > highScore) {
        setHighScore(gameScore);
      }
    }
  };

  const resetGame = () => {
    setGameScore(20);
    setRandomNumber(Math.trunc(Math.random() * 20 + 1));
    setInputValue('');
    setMessage('Start guessing...');
    setCorrectGuess(false);  // Reset correct guess
  };

  return (
    <div className="container">
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <div className="number">{correctGuess ? randomNumber : '?'}</div>
      </header>

      <main>
        <div className="left">
          <input
            className="guess"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn check" onClick={checkGuess}>
            Check!
          </button>
          <button className="btn again" onClick={resetGame}>
            Again!
          </button>
        </div>

        <div className="right">
          <p className="message">{message}</p>
          <p className="label-score">
            💯 Score: <span className="score">{gameScore}</span>
          </p>
          <p className="label-score">
            🥇 Highscore: <span className="highscore">{highScore}</span>
          </p>
        </div>
      </main>
    </div>
  );
};

// Render the GuessGame component to the root element
ReactDOM.render(
  <React.StrictMode>
    <GuessGame />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure the div with id="root" exists in your index.html
);
