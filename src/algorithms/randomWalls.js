import { COLUMNS, ROWS } from "../Constants";

export const createRandomWalls = (matrix) => {
    for(let i = 0; i < 500; i++) {
        let randomRow = Math.floor(Math.random() * ROWS);
        let randomCol = Math.floor(Math.random() * COLUMNS);
        let threshold = Math.random() * 10;
        
        const node = matrix[randomRow][randomCol];
        node.isWall = (node.isStart || node.isEnd) && threshold < 7 ? false : true;
    }

    return matrix;
};