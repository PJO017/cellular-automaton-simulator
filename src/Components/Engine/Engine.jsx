import React, { useState, useRef } from 'react'
import { produce } from 'immer'
import { Algorithms } from './Algorithms';
import { Controls } from './Controls/Controls'
import './Engine.scss'


export const Engine = () => {
    // Grid dimensions
    const rows = 20;
    const cols = 30;

    const [grid, setGrid] = useState(() => {
        let grid = [];
        for (let i = 0; i < rows; i++) {
            grid.push(Array.from(Array(cols), () => 0))
        }
        return grid;
    })
    const [initGrid, setInitGrid] = useState(grid)
    const [gen, setGen] = useState(0)

    // Algorithms
    const { runAlgorithm } = Algorithms(setGrid, setGen, rows, cols);
    const algos = ["Conway", "Life Without Death", "HighLife", "Day and Night", "Replicator", "Seed", 'Just Friends'];

    const [currAlgo, setCurrAlgo] = useState(0);
    const currAlgoRef = useRef(currAlgo)

    const [running, setRunning] = useState(false)
    const runningRef = useRef(running)

    const [speed, setSpeed] = useState(0)
    const speedRef = useRef(0)

    const startSim = () => {
        if (!runningRef.current) {
            return; 
        }
        runAlgorithm(algos[currAlgoRef.current]);
        setTimeout(() => {
            startSim();
        }, speedRef.current);
    }

    // Start algorithm
    const start = () => {
        if (gen===0) setInitGrid(grid)
        setRunning(!running);
        runningRef.current = !runningRef.current
        startSim(speedRef)
    }

    // Run one generation
    const nextGen = () => {
        if (running) return;
        else {
            if (gen===0) setInitGrid(grid)
            setRunning(true);
            runningRef.current = true;
            startSim(speedRef)
            setRunning(false);
            runningRef.current= false;
        }
    }

    // Toggle Cell 
    const toggleClick = (r, c) => {
        const newGrid = produce(grid, gridCopy => {
            gridCopy[r][c] = gridCopy[r][c] ? 0 : 1
        })
        setGrid(newGrid);
    }

    // Change speed
    const changeSpeed = e => {
        let reverse = Math.abs(e.target.value)
        setSpeed(reverse);
        speedRef.current = reverse;
    }

    // Change current algorithm
    const changeAlgo = e => {
        setCurrAlgo(e.target.value)
        currAlgoRef.current = e.target.value
        setRunning(false);
        runningRef.current = false;
        setGen(0);
    }

    // Clear grid cells
    const clearGrid = () => {
        setRunning(false);
        runningRef.current = false;
        const newGrid = produce(grid, gridCopy => {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    gridCopy[i][j] = 0;
                }
            }
        })
        setGrid(newGrid)
        setGen(0)
    }

    // Reset grid to initial state
    const resetGrid = () => {
        setRunning(false);
        runningRef.current = false;
        setGrid(initGrid);
        setGen(0);
    }

    return (
        <div className="main">
            <div className="info" style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                <span>Generation: {gen}</span>
                <span>{algos[currAlgoRef.current]}</span>
            </div>
            <div className="display">
                <div className="controls-container">
                    <Controls 
                        running={running}
                        start={start}
                        resetGrid={resetGrid}
                        clearGrid={clearGrid}
                        nextGen={nextGen}
                        changeSpeed={changeSpeed}
                        changeAlgo={changeAlgo}
                        algos={algos}
                        currAlgo={currAlgo}
                    /> 
                </div>
                <div className="grid-container">
                    <div className='grid'>
                        {grid.map((row, r) => (
                            <div key={r} className='row'>
                                {
                                row.map((cell, c) => 
                                    (<div 
                                        key={c}
                                        className={`node node-${grid[r][c] === 1 ? 'alive' : 'dead'}`}
                                        onClick={() => toggleClick(r, c)}
                                        >
                                        {grid[r][c] === 1}
                                    </div>))
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
