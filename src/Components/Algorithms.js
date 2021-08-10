import { produce } from 'immer';

export const Algorithms = (setGrid, setGen, rows, cols) => {
    const x = [1, -1, 0, 0, 1, -1, -1, 1];
    const y = [0, 0, 1, -1, 1, -1, 1, -1];
    
    // Conway's Way Of Life
    const Conways = () => {
        setGrid(curGrid => {
            return produce(curGrid, newGrid => {
                // Traverse every cell
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        // Get number of alive neighbors
                        var neighbors = 0;
                        for (let d = 0; d < 8; d++) {
                            const newI = i + x[d];
                            const newJ = j + y[d];
            
                            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols) {
                                neighbors += curGrid[newI][newJ];
                            }
                        }
            
                        // Conway's Way of Life
                        // if (neighbors < 2 && neighbors < 3) {
                        //     newGrid[i][j] = 0;
                        // } else if (curGrid[i][j] === 0 && neighbors === 3) {
                        //     newGrid[i][j] = 1;
                        // }

                        // Life Without Death
                        // if (curGrid[i][j] === 0 && neighbors === 3) {
                        //     newGrid[i][j] = 1;
                        // }


                        // HighLife
                        // if (neighbors < 2 || neighbors > 3) {
                        //     newGrid[i][j] = 0;
                        // }
                        // else if (curGrid[i][j] === 0 && (neighbors === 3 || neighbors === 6)) {
                        //     newGrid = 1;
                        // }


                    }
                }
           })
        })
        setGen(gen => gen+1)
    }

    return {
        Conways
    }
}
