import { COLUMNS, ROWS } from "../Constants";


//work on this
const buildRecursiveWalls = (matrix) => {

    const stack = [];
    const wallsToAnimate = [];
    const startingPoint = matrix[0][0];

    stack.push(startingPoint);
    
    while(stack.length) {
        let currentCell = stack.pop();
        let neighbor = getRandomNeighbor(currentCell);
        
        currentCell.visited = true;
        
    };

};

const getRandomNeighbor = (node) => {



    return
};