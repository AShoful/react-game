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

  const [mainState, setMainState] = useState({
    buttonName: 'Play',
    isDisabled: false,
    isPlay: false,
    currentIndex: -1
  });

  const [winner, setWinner] = useState(null);
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
      setMainState((mainState) => {
        const newState = { ...mainState };
        newState.buttonName = 'Play again';
        newState.isDisabled = false;
        newState.isPlay = false;
        return { ...newState };
      });
    }
  }, [winner]);

  const generateRandomIndex = (arr) => {
    if (!Array.isArray(arr)) {
      return;
    }
    if (mainState.currentIndex !== -1) {
      setMainState((mainState) => {
        const newState = { ...mainState };
        newState.currentIndex = -1;
        newState.isPlay = false;
        return { ...newState };
      });
      setWinner(null);
    }

    setMainState((mainState) => {
      const newState = { ...mainState };
      newState.isDisabled = true;
      newState.isPlay = true;
      return { ...newState };
    });
    let count = 0;
    onInterval(() => {
      const index = arr[count];
      setMainState((mainState) => {
        const newState = { ...mainState };
        newState.currentIndex = index;
        return { ...newState };
      });
      count += 1;
    });
  };
  console.log(option);
  const { isDisabled, currentIndex, isPlay, buttonName } = mainState;
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
