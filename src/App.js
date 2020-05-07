/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { cells } from './functions';

import FildGame from './FildGame';

import './App.css';

function App() {
  const filds = 3;
  const delay = 1000;

  const [buttonName, setButtonName] = useState('Play');
  const [isDisabled, setIsDisabled] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [option, setOption] = useState(null);

  const intervalRef = useRef(null);

  const onInterval = (go) => {
    intervalRef.current = setInterval(go, delay);
  };

  useEffect(() => {
    fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
      .then((res) => res.json())
      .then((res) => setOption(res))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (winner) {
      console.log('uEff winner');
      clearInterval(intervalRef.current);
      setButtonName('Play again');
      setIsDisabled(false);
      setIsPlay(false);
    }
  }, [winner]);

  const generateRandomIndex = (arr) => {
    if (!Array.isArray(arr)) {
      return;
    }
    if (currentIndex !== -1) {
      setCurrentIndex(-1);
      setIsPlay(false);
      setWinner(null);
    }

    setIsDisabled(true);
    setIsPlay(true);
    let count = 0;
    onInterval(() => {
      const index = arr[count];
      setCurrentIndex(index);
      count += 1;
    });
  };
  console.log(option);
  // const { filds: FILD_SIZE, delay } = option.hardMode;

  return (
    <div className="App">
      <button
        className="playButton"
        onClick={() => generateRandomIndex(cells(filds ** 2))}
        type="button"
        disabled={isDisabled}
      >
        {buttonName}
      </button>
      {winner && <p> Победил {winner} </p>}
      <FildGame
        currentIndex={currentIndex}
        isPlay={isPlay}
        setWinner={setWinner}
        filds={filds}
        delay={delay}
      />
    </div>
  );
}

export default App;
