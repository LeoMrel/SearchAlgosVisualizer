import { animateAlgo, clearAllNodesStyles, getNodesInShortestPathOrder, getUnvisitedNeighbors } from "./auxFunctions";


export const visualizeBFS = (matrix, variables) => {

    const { startNode, endNode, speed, setIsRunningAnimation } = variables;

    clearAllNodesStyles();

    const visitedNodesInOrder = BFS(matrix, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    
    animateAlgo(visitedNodesInOrder, shortestPath, speed, setIsRunningAnimation);
};
 

const BFS = (matrix, startNode, endNode) => {
    const Q = [];
    const visitedNodes = [];
    
    startNode.visited = true;
    startNode.distance = 0;
    Q.push(startNode);

    while (Q.length) {
        let currentNode = Q.shift();
        visitedNodes.push(currentNode);

        if(currentNode === endNode) return visitedNodes;

        for(let neighbor of getUnvisitedNeighbors(currentNode, matrix)) {
            if(neighbor.isWall) continue;

            if(!neighbor.visited) {
                neighbor.previousNode = currentNode;
                neighbor.distance = currentNode.distance + 1;
                neighbor.visited = true;
                Q.push(neighbor);
            }
        }
    };

    return visitedNodes;
};
