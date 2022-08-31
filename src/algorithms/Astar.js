import { animateAlgo, clearAllNodesStyles, getNodesInShortestPathOrder, getUnvisitedNeighbors } from "./auxFunctions";

export const visualizeAstar = (nodesMatrix, variables) => {

    const { startNode, endNode, speed, setIsRunningAnimation } = variables

    clearAllNodesStyles();

    const visitedNodesInOrder = Astar(nodesMatrix, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);

    animateAlgo(visitedNodesInOrder, shortestPath, speed, setIsRunningAnimation);
}


const Astar = (nodesMatrix, startNode, endNode) => {
    const openSet = [];
    const visitedNodesInOrder = [];

    startNode.distance = 0;
    startNode.gScore = 0;
    startNode.hScore = heuristic_cost_estimate(startNode, endNode);
    startNode.fScore = startNode.hScore;
    openSet.push(startNode);


    while (openSet.length) {

        let lowestFScore = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].fScore < openSet[lowestFScore].fScore) {
                lowestFScore = i;
            };
        }

        let currentNode = openSet[lowestFScore];
        visitedNodesInOrder.push(currentNode);


        if (currentNode === endNode) return visitedNodesInOrder;


        openSet.splice(lowestFScore, 1);
        currentNode.visited = true;


        for (let neighbor of getUnvisitedNeighbors(currentNode, nodesMatrix)) {
            if (neighbor.isWall) continue;

            let tentative_gScore = currentNode.gScore + 1;
            if (tentative_gScore < neighbor.gScore) {
                neighbor.distance = currentNode.distance + 1;
                neighbor.gScore = tentative_gScore;
                neighbor.hScore = heuristic_cost_estimate(neighbor, endNode);
                neighbor.fScore = neighbor.gScore + neighbor.hScore;
                neighbor.previousNode = currentNode;
                if (!isInSet(neighbor, openSet)) {
                    openSet.push(neighbor);
                }
            }
        }

    };

    return visitedNodesInOrder;
};

const heuristic_cost_estimate = (currentNode, endNode) => {
    const dx = Math.abs(currentNode.col - endNode.col);
    const dy = Math.abs(currentNode.row - endNode.row);

    const heuristic = dx + dy;

    return heuristic;
};


function isInSet(currentNode, set) {
    for (let i = set.length - 1; i >= 0; i++) {
        if (set[i].row === currentNode.row && set[i].col === currentNode.col) {
            return true;
        } else {
            return false;
        }
    }
};
