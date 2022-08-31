import { animateAlgo, clearAllNodesStyles, getNodesInShortestPathOrder } from "./auxFunctions";

export const visualizeDFS = (matrix, variables) => {

    const { startNode, endNode, speed, setIsRunningAnimation } = variables;

    clearAllNodesStyles();

    const visitedNodesInOrder = DFS(matrix, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);

    animateAlgo(visitedNodesInOrder, shortestPath, speed, setIsRunningAnimation);
};

const DFS = (matrix, startNode, endNode) => {
    const stack = [];
    const visitedNodes = [];
    stack.push(startNode);

    while(stack.length > 0) {
        let currentNode = stack.pop();
        visitedNodes.push(currentNode);
        currentNode.visited = true;

        if(currentNode === endNode) return visitedNodes;

        for(let neighbor of getNeighbors(currentNode, matrix)) {
            if(neighbor.isWall) continue;

            if(!neighbor.visited) {
                neighbor.previousNode = currentNode;
                stack.push(neighbor);
            }
        }
    };

    return visitedNodes;
};

const getNeighbors = (node, grid) => {
    const neighbors = [];
    const {row, col} = node;
    
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);

    
    return neighbors.filter(neighbor => !neighbor.visited);
};