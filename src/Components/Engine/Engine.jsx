import React, { useState, useRef } from 'react'
import { produce } from 'immer'
import { Algorithms } from './Algorithms'
import { Controls } from '../Controls/Controls'
import { Presets } from '../Presets/Presets.jsx'
import './Engine.scss'


export const Engine = () => {
    // Grid dimensions
    const rows = 45;
    const cols = 45;
    const ratio = 560;
    const cellSize = ratio/rows


    // Set grid state
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
    const algos = ["Conway's Way of Life", "Life Without Death", "HighLife", "Day and Night", "Replicator", "Seed", 'Just Friends'];

    // Current algorithm
    const [currAlgo, setCurrAlgo] = useState(0);
    const currAlgoRef = useRef(currAlgo)

    const [running, setRunning] = useState(false)
    const runningRef = useRef(running)

    const [speed, setSpeed] = useState(0)
    const speedRef = useRef(speed)

    // Start running simulation
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

    // Simulate one generation
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

    // Toggle cell click
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

    // Presets
    const [isPresetsOpen, setIsPresetsOpen] = useState(false)

    // Load preset config
    const loadConfig = (config) => {
        const newGrid = produce(grid, gridCopy => {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    gridCopy[i][j] = 0;
                }
            }

            for (let i = 0; i < config.length; i++) {
                const x = config[i][0];
                const y = config[i][1];
                gridCopy[x][y] = 1;
            }
        })  
        setRunning(false)
        runningRef.current = false 
        setCurrAlgo(0) 
        currAlgoRef.current = 0
        setGrid(newGrid)
        setInfo({
            gen: 0, 
            alive: config.length,
            dead: (rows*cols)-config.length
        })
    }

    return (
        <div className="main">
            <Presets isOpen={isPresetsOpen} setIsOpen={setIsPresetsOpen} loadConfig={loadConfig}/>
            <div className="options">
                <div className="config">
                    <span className="title">Configuration</span>
                    <div className="config-buttons">
                        <button className="preset" onClick={() => setIsPresetsOpen(true)}>
                            <span className="icon"><span class="material-icons">view_list</span>Presets</span>
                        </button>
                        <button 
                            className="random"
                            onClick={genRandGrid}>
                            <span className="icon">
                                <span class="material-icons">shuffle</span>
                                Randomize
                            </span>
                        </button>
                    </div> 
                </div>
                <div className="algorithms">
                    <span className="title">Algorithm</span>
                    <select 
                        onChange={changeAlgo}
                        value={currAlgo}
                        disabled={running}>
                        {algos.map((algo, idx) => (
                            <option style={{backgroundColor:"grey", color:"rgb(255, 250, 250)"}}key={idx} value={idx}>{algo}</option>
                        ))}
                    </select>
                </div>
                
                <Controls 
                    running={running}
                    start={start}
                    resetGrid={resetGrid}
                    clearGrid={clearGrid}
                    nextGen={nextGen}
                    speed={speed}
                    changeSpeed={changeSpeed}
                />
            </div> 
            <div className="grid-container">
                <div className="container-outline">
                    <div className='grid'>
                        {grid.map((row, r) => (
                            <div key={r} className='row'>
                                {
                                row.map((cell, c) => 
                                    (<div 
                                        key={c}
                                        className={`node node-${grid[r][c] === 1 ? 'alive' : 'dead'}`}
                                        style={{width: cellSize, height: cellSize}}
                                        onClick={() => toggleClick(r, c)}
                                        >
                                    </div>))
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="info">
                <span style={{fontSize: 40, margin: 20}}>Info</span>
                <span className="title">Algorithm</span>
                <span className="data">{algos[currAlgoRef.current]}</span>
                <span className="title">Generation</span>
                <span className="data">{info.gen}</span>
                <span className="title">Alive</span>
                <span className="data">{info.alive}</span>
                <span className="title">Dead</span>
                <span className="data">{info.dead}</span>
            </div>
            
        </div>
    )
}
