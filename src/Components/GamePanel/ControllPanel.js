/* eslint-disable react/prop-types */
import React from 'react';

const ControllPanel = ({ isDisabled, buttonName, handleCancel, start }) => {
  return (
    <div>
      <button
        className="playButton"
        onClick={start}
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
