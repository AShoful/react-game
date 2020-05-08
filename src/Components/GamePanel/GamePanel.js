/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
// import { cells } from './functions';

import FildGame from './FildGame';
import ControllPanel from './ControllPanel';

import './GamePanel.css';

function GamePanel() {
  const filds = 3;
  const delay = 2000;

  const [mainState, setMainState] = useState({
    buttonName: 'Play',
    isDisabled: false,
    isPlay: false,
    currentIndex: -1
  });

  const [winner, setWinner] = useState(null);
  const [, setOption] = useState(null);

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
      clearInterval(intervalRef.current);
      setMainState((mainState) => ({
        ...mainState,
        buttonName: 'Play again',
        isDisabled: false,
        isPlay: false
      }));
    }
  }, [winner]);

  const generateRandomIndex = (arr) => {
    if (!Array.isArray(arr)) {
      return;
    }
    if (mainState.currentIndex !== -1) {
      setMainState({ ...mainState, currentIndex: -1, isPlay: false });
      setWinner(null);
    }
    setMainState({ ...mainState, isPlay: true, isDisabled: true });
    let count = 0;
    onInterval(() => {
      setMainState((mainState) => ({ ...mainState, currentIndex: arr[count] }));
      count += 1;
    });
  };

  const handleCancel = () => {
    clearInterval(intervalRef.current);
    setMainState({ ...mainState, isPlay: false, isDisabled: false });
  };

  const { isDisabled, currentIndex, isPlay, buttonName } = mainState;
  return (
    <div className="App">
      {/* <button
        className="playButton"
        onClick={() => generateRandomIndex(cells(filds ** 2))}
        type="button"
        disabled={isDisabled}
      >
        {buttonName}
      </button>
      <button type="button" onClick={handleCancel}>
        cancel
      </button> */}
      <ControllPanel
        isDisabled={isDisabled}
        buttonName={buttonName}
        handleCancel={handleCancel}
        generateRandomIndex={generateRandomIndex}
        filds={filds}
      />
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

export default GamePanel;
