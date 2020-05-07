/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import './FildGame.css';

function FildGame({ currentIndex, isPlay, setWinner, filds, delay }) {
  const WIDTH_GAME_FILD = 310;
  const [randomCeil, setRandomCeil] = useState([]);

  const timerRef = useRef(null);

  const onTimer = (go) => {
    timerRef.current = setTimeout(go, delay);
  };

  const changeColorCell = (currentIndex, color) => {
    setRandomCeil((randomCeil) => {
      const newArr = [...randomCeil];
      newArr[currentIndex] = color;
      return [...newArr];
    });
  };

  const checkWinner = (color, arr) =>
    arr.filter((i) => i && i === color).length;

  useEffect(() => {
    if (!isPlay) {
      setRandomCeil([]);
    }
  }, [isPlay]);

  useEffect(() => {
    changeColorCell(currentIndex, 'blue');
    onTimer(() => {
      changeColorCell(currentIndex, 'red');
    });
  }, [currentIndex, onTimer]);

  useEffect(() => {
    const user = checkWinner('green', randomCeil);
    const computer = checkWinner('red', randomCeil);
    if (user > filds ** 2 / 2) {
      setWinner('player');
      clearTimeout(timerRef.current);
    }
    if (computer > filds ** 2 / 2) {
      setWinner('computer');
      clearTimeout(timerRef.current);
    }
  }, [filds, randomCeil, setWinner]);

  const action = (index) => {
    if (!(currentIndex === index)) {
      return;
    }
    clearTimeout(timerRef.current);
    changeColorCell(index, 'green');
  };

  const sizeCell = (WIDTH_GAME_FILD - filds * 2) / filds;
  return (
    <div className="field" style={{ width: WIDTH_GAME_FILD }}>
      {Array(filds ** 2)
        .fill('')
        .map((item, index) => (
          <div
            className={randomCeil[index] ? `ceil ${randomCeil[index]}` : 'ceil'}
            style={{ width: sizeCell, height: sizeCell }}
            key={`${index + Date.now()}`}
            onClick={() => action(index)}
            role="button"
          />
        ))}
    </div>
  );
}

export default FildGame;
