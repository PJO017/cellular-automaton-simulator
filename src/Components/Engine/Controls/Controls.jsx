import React from "react";
import "./Controls.scss";

export const Controls = (props) => {
  const { 
    running,
    resetGrid,
    clearGrid, 
    start,
    nextGen,
    changeSpeed,
    changeAlgo,
    currAlgo,
    algos
  } = props;

  return (
    <div className="buttons">
      <span style={{ color: "black" }}>Controls</span>
      <button className="start" onClick={start}>
        {running ? "Stop" : "Start"}
      </button>
      <button className="next" onClick={nextGen}>
        Next
      </button>
      <button className="reset" onClick={resetGrid}>
        Reset
      </button>
      <button className="clear" onClick={clearGrid}>
        Clear
      </button>
      <span>Speed</span>
      <input
          type="range"
          min="-1000"
          max="0"
          class="slider"
          step="100"
          className="speed-slider"
          onChange={changeSpeed}
      ></input>
      <span>Choose Algorithm</span>
      <select 
          className="algorithms"
          onChange={changeAlgo}
          value={currAlgo}
          disabled={running}
          style={{margin: 5}}>
          {algos.map((algo, idx) => (
              <option key={idx} value={idx}>{algo}</option>
          ))}
      </select>
    </div>
  );
};
