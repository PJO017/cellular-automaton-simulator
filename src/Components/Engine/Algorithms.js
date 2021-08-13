import { produce } from 'immer';

export const Algorithms = (setGrid, setInfo, rows, cols) => {
    const dx = [1, -1, 0, 0, 1, -1, -1, 1];
    const dy = [0, 0, 1, -1, 1, -1, 1, -1];
    
    const runAlgorithm = (algorithm) => {
        var updatePop = 0;
        setGrid(curGrid => {
            return produce(curGrid, newGrid => {
                // Traverse every cell
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        // Get number of alive neighbors
                        var neighbors = 0;
                        var diagNeighbors = 0;

                        for (let d = 0; d < 8; d++) {
                            const newI = i + dx[d];
                            const newJ = j + dy[d];
            
                            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols) {
                                neighbors += curGrid[newI][newJ];
                                if (newI !== 0 && newJ !== 0) {
                                    diagNeighbors += curGrid[newI][newJ];
                                }
                            }
                        }

                        // Algorithm rules
                        switch(algorithm) {
                            case "Conway":
                                if (neighbors < 2 || neighbors > 3) {
                                    if (curGrid[i][j] === 1)
                                        updatePop--;
                                    newGrid[i][j] = 0;
                                } else if (curGrid[i][j] === 0 && neighbors === 3) {
                                    newGrid[i][j] = 1;
                                    updatePop++;
                                }
                                break;
                            case "Life Without Death":
                                if (curGrid[i][j] === 0 && neighbors === 3) {
                                    newGrid[i][j] = 1;
                                    updatePop++;
                                }
                                break;
                            case "HighLife":
                                if (neighbors < 2 || neighbors > 3) {
                                    if (curGrid[i][j] === 1)
                                        updatePop--;
                                    newGrid[i][j] = 0;
                                }
                                else if (curGrid[i][j] === 0 && (neighbors === 3 || neighbors === 6)) {
                                    newGrid[i][j] = 1;
                                    updatePop++;
                                }
                                break;
                            case "Day and Night":
                                if (neighbors === 1 || neighbors === 2 || neighbors === 5) {
                                    if (curGrid[i][j] === 1)
                                        updatePop--;
                                    newGrid[i][j] = 0;
                                }
                                else if (curGrid[i][j] === 0 && 
                                        (neighbors === 3 || (neighbors < 5 && neighbors < 9))) {
                                    newGrid[i][j] = 1;
                                    updatePop++;
                                }
                                break;
                            case "Replicator":
                                if (neighbors % 3 === 0) {
                                    if (curGrid[i][j] === 0)
                                        updatePop++;
                                    newGrid[i][j] = 1;
                                } else {
                                    if (curGrid[i][j] === 1)
                                        updatePop--;
                                    newGrid[i][j] = 0;
                                }
                                break;
                            case "Just Friends":
                                if (curGrid[i][j] === 1 && (neighbors < 1 || neighbors > 2)) {
                                    newGrid[i][j] = 0;
                                    updatePop--;
                                } else if (curGrid[i][j] === 0 && (diagNeighbors === 2 && neighbors === 2)) {
                                    newGrid[i][j] = 1;
                                    updatePop++;
                                }
                                break;
                            default:
                                // Seed
                                if (curGrid[i][j] === 0 && neighbors === 2) {
                                    if (curGrid[i][j] === 0)
                                        updatePop++;
                                    newGrid[i][j] = 1;
                                } else {
                                    if (curGrid[i][j] === 1)
                                        updatePop--;
                                    newGrid[i][j] = 0;
                                }      
                        }
                    }
                }
           })
        })
        setInfo(curInfo => {
            return {
                gen: curInfo.gen+1,
                alive: curInfo.alive+updatePop,
                dead: curInfo.dead-updatePop,
            }
        })
    }

    const genRandGrid = () => {
        let alive = 0;
        let dead = 0;
        setGrid(grid => {
            return produce(grid, randGrid => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        const r = Math.floor(Math.random() * 2);
                        randGrid[i][j] = r;
                        if (r === 1)
                            alive++;
                        else
                            dead++;
                    }
                }
            })
        })
        setInfo(curInfo => {
            return {
                gen: 0,
                alive: alive,
                dead: dead,
            }
        })
    }

    return {
        runAlgorithm,
        genRandGrid,
    }
}
