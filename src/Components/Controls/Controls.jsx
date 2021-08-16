import React from "react";
import "./Controls.scss";

export const Controls = (props) => {
  const { 
    running,
    resetGrid,
    clearGrid, 
    start,
    nextGen,
    speed,
    changeSpeed,
  } = props;

  return (
    <div className="controls-container">
      <span className="title">Controls</span>
      <button className="start" onClick={start}>
        {running ?
          <span><span class="material-icons">stop</span>Stop</span>: 
          <span><span class="material-icons">play_arrow</span>Start</span>
          }
      </button>
      <button className="next" onClick={nextGen}>
      <span><span class="material-icons">redo</span>Next</span>
      </button>
      <button className="reset" onClick={resetGrid}>
        <span><span class="material-icons">restart_alt</span>Reset</span>
      </button>
      <button className="clear" onClick={clearGrid}>
        <span><span class="material-icons">clear</span>Clear</span>
      </button>
      <div className="speed">
        <span><span class="material-icons">speed</span>Speed</span>
        <input
          type="range"
          min="-1000"
          max="0"
          step="100"
          className="speed-slider"
          onChange={changeSpeed}>
        </input>
        <span>{(speed-1000)/(-100)}</span>
      </div>
    </div>
  );
};
