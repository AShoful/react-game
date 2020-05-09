/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import './FildGame.css';

function FildGame({
  currentIndex,
  isPlay,
  setWinner,
  field,
  delay,
  playerName
}) {
  const WIDTH_GAME_FILD = 310;
  const totalFilds = field ** 2;
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

  const checkWinner = (color) =>
    randomCeil.filter((i) => i && i === color).length;

  useEffect(() => {
    if (!isPlay) {
      setRandomCeil([]);
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlay]);

  useEffect(() => {
    changeColorCell(currentIndex, 'blue');
    onTimer(() => {
      changeColorCell(currentIndex, 'red');
    });
    // return () => clearTimeout(timerRef.current);
  }, [currentIndex]);

  useEffect(() => {
    if (checkWinner('green') > totalFilds / 2) {
      setWinner(playerName);
      clearTimeout(timerRef.current);
    }
    if (checkWinner('red') > totalFilds / 2) {
      setWinner('computer');
      clearTimeout(timerRef.current);
    }
  }, [field, randomCeil, setWinner]);

  const action = (index) => {
    if (!(currentIndex === index)) {
      return;
    }
    clearTimeout(timerRef.current);
    changeColorCell(index, 'green');
  };
  console.log(field, delay);
  const sizeCell = (WIDTH_GAME_FILD - field * 2) / field;
  return (
    <div className="field" style={{ width: WIDTH_GAME_FILD }}>
      {Array(totalFilds)
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
