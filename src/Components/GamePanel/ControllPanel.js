/* eslint-disable react/prop-types */
import React from 'react';
import { cells } from './functions';

const ControllPanel = ({
  isDisabled,
  buttonName,
  handleCancel,
  generateRandomIndex,
  filds
}) => {
  return (
    <div>
      <button
        className="playButton"
        onClick={() => generateRandomIndex(cells(filds ** 2))}
        type="button"
        disabled={isDisabled}
      >
        {buttonName}
      </button>
      <button type="button" onClick={handleCancel}>
        cancel
      </button>
    </div>
  );
};

export default ControllPanel;
