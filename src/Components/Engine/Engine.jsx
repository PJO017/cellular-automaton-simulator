import React, { useState, useRef } from 'react'
import { produce } from 'immer'
import { Algorithms } from './Algorithms';
import { Controls } from '../Controls/Controls'
import './Engine.scss'


export const Engine = () => {
    // Grid dimensions
    const rows = 45;
    const cols = 55;

    // row 45 col 55

    const [grid, setGrid] = useState(() => {
        let grid = [];
        for (let i = 0; i < rows; i++) {
            grid.push(Array.from(Array(cols), () => 0))
        }
        return grid;
    })


    // Initial States
    const [info, setInfo] = useState({
        gen: 0,
        alive: 0,
        dead: rows*cols,
    })
    const [initState, setInitState] = useState({grid, info})
    

    // Algorithms
    const { runAlgorithm, genRandGrid } = Algorithms(setGrid, setInfo, rows, cols);
    const algos = ["Conway", "Life Without Death", "HighLife", "Day and Night", "Replicator", "Seed", 'Just Friends'];

    const [currAlgo, setCurrAlgo] = useState(0);
    const currAlgoRef = useRef(currAlgo)

    const [running, setRunning] = useState(false)
    const runningRef = useRef(running)

    const [speed, setSpeed] = useState(0)
    const speedRef = useRef(speed)

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
        if (info.gen===0) setInitState({grid, info})
        setRunning(!running);
        runningRef.current = !runningRef.current
        startSim(speedRef)
    }

    // Run one generation
    const nextGen = () => {
        if (running) return;
        else {
            if (info.gen===0) setInitState({grid, info})
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
            if (grid[r][c] === 0) {
                gridCopy[r][c] = 1;
                setInfo({
                        ...info, 
                        alive: info.alive+1, 
                        dead: info.dead-1
                })
            } else {
                gridCopy[r][c] = 0;
                setInfo({
                    ...info, 
                    alive: info.alive-1, 
                    dead: info.dead+1
            })
            }
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
        setInfo({
            ...info,
            gen: 0,
        })
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
        setGrid(newGrid);
        setInfo({
            gen: 0,
            alive: 0,
            dead: rows*cols
        })
    }

    // Reset grid to initial state
    const resetGrid = () => {
        setRunning(false);
        runningRef.current = false;
        setGrid(initState.grid);
        setInfo(initState.info)
    }

    return (
        <div className="main">
            <div className="options">
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
                <button onClick={genRandGrid}>
                    Randomize
                </button>
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
            <div className="info">
                <span>{algos[currAlgoRef.current]}</span>
                <span>Generation: {info.gen}</span>
                <span>Alive: {info.alive}</span>
                <span>Dead: {info.dead}</span>
            </div>
        </div>
    )
}
