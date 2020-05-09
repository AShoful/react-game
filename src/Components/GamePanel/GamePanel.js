/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { cells } from './functions';

import FildGame from './FildGame';
import ControllPanel from './ControllPanel';

import './GamePanel.css';

function GamePanel() {
  const filds = 4;
  const delay = 2000;

  const [mainState, setMainState] = useState({
    buttonName: 'Play',
    isDisabled: false,
    isPlay: false,
    currentIndex: -1,
    winner: null
  });

  // const [, setOption] = useState(null);

  const intervalRef = useRef(null);

  const onInterval = (go) => {
    intervalRef.current = setInterval(go, delay);
  };

  const generateRandomIndex = (arr) => {
    if (!Array.isArray(arr)) {
      return;
    }
    if (mainState.currentIndex !== -1) {
      setMainState({ ...mainState, currentIndex: -1, winner: null });
    }
    setMainState({ ...mainState, isDisabled: true });
    let count = 0;
    onInterval(() => {
      setMainState((mainState) => ({ ...mainState, currentIndex: arr[count] }));
      count += 1;
    });
  };
  // useEffect(() => {
  //   fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
  //     .then((res) => res.json())
  //     .then((res) => setOption(res))
  //     .catch((err) => console.log(err.message));
  // }, []);

  useEffect(() => {
    if (mainState.winner) {
      clearInterval(intervalRef.current);
      setMainState((mainState) => ({
        ...mainState,
        buttonName: 'Play again',
        isDisabled: false,
        isPlay: false
      }));
    }
  }, [mainState.winner]);

  useEffect(() => {
    if (mainState.isPlay) {
      generateRandomIndex(cells(filds ** 2));
    }
    return () => clearInterval(intervalRef.current);
  }, [mainState.isPlay]);

  const handleCancel = () => {
    clearInterval(intervalRef.current);
    setMainState({ ...mainState, isPlay: false, isDisabled: false });
  };

  const start = () => setMainState({ ...mainState, isPlay: true });
  const setWinner = (user) => setMainState({ ...mainState, winner: user });

  const { isDisabled, currentIndex, isPlay, buttonName, winner } = mainState;
  return (
    <div className="App">
      <ControllPanel
        isDisabled={isDisabled}
        buttonName={buttonName}
        handleCancel={handleCancel}
        start={start}
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