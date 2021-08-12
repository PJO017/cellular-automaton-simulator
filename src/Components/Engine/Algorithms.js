import { produce } from 'immer';

export const Algorithms = (setGrid, setGen, rows, cols) => {
    const dx = [1, -1, 0, 0, 1, -1, -1, 1];
    const dy = [0, 0, 1, -1, 1, -1, 1, -1];
    
    const runAlgorithm = (algorithm) => {
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
                                    newGrid[i][j] = 0;
                                } else if (curGrid[i][j] === 0 && neighbors === 3) {
                                    newGrid[i][j] = 1;
                                }
                                break;
                            case "Life Without Death":
                                if (curGrid[i][j] === 0 && neighbors === 3) {
                                    newGrid[i][j] = 1;
                                }
                                break;
                            case "HighLife":
                                if (neighbors < 2 || neighbors > 3) {
                                    newGrid[i][j] = 0;
                                }
                                else if (curGrid[i][j] === 0 && (neighbors === 3 || neighbors === 6)) {
                                    newGrid[i][j] = 1;
                                }
                                break;
                            case "Day and Night":
                                if (neighbors === 1 || neighbors === 2 || neighbors === 5) {
                                    newGrid[i][j] = 0;
                                }
                                else if (curGrid[i][j] === 0 && 
                                        (neighbors === 3 || (neighbors < 5 && neighbors < 9))) {
                                    newGrid[i][j] = 1;
                                }
                                break;
                            case "Replicator":
                                if (neighbors % 3 === 0) {
                                    newGrid[i][j] = 1;
                                } else {
                                    newGrid[i][j] = 0;
                                }
                                break;
                            case "Just Friends":
                                if (curGrid[i][j] === 1 && (neighbors < 1 || neighbors > 2)) {
                                    newGrid[i][j] = 0;
                                } else if (curGrid[i][j] === 0 && (diagNeighbors === 2 && neighbors === 2)) {
                                    newGrid[i][j] = 1;
                                }
                                break;
                            default:
                                // Seed
                                if (curGrid[i][j] === 0 && neighbors === 2) {
                                    newGrid[i][j] = 1;
                                } else {
                                    newGrid[i][j] = 0;
                                }      
                        }
                    }
                }
           })
        })
        setGen(gen => gen+1)
    }

    return {
        runAlgorithm
    }
}
