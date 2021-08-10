import React, { useState, useRef, useCallback } from 'react'
import { produce } from 'immer'
import { Algorithms } from '../Algorithms';
import './Grid.css'


export const Grid = () => {
    // Grid dimensions
    const rows = 20;
    const cols = 60;

    const [grid, setGrid] = useState(() => {
        let grid = [];
        for (let i = 0; i < rows; i++) {
            grid.push(Array.from(Array(cols), () => 0))
        }
        return grid;
    })
    const [gen, setGen] = useState(0)

    // Algorithms
    const { Conways } = Algorithms(setGrid, setGen, rows, cols);

    const [running, setRunning] = useState(false)
    const runningRef = useRef(running)

    const startSim = useCallback(() => {
        if (!runningRef.current) {
            return; 
        }
        Conways();
        setTimeout(() => {
            startSim()
        },100);
    },[])

    const toggleClick = (r, c) => {
        const newGrid = produce(grid, gridCopy => {
            gridCopy[r][c] = gridCopy[r][c] ? 0 : 1
        })
        setGrid(newGrid);
    }




    return (
        <>
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
        <button onClick={() => {
            setRunning(!running);
            runningRef.current = !runningRef.current
            startSim()
        }}>{running ? 'Stop' : 'Start'}</button>
        <span>Generation: {gen}</span>
        </>
    )
}
