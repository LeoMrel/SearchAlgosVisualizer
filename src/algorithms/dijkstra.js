import { createNodesMap, sortNodesByDistance, getNodesInShortestPathOrder, updateUnvisitedNeighbors } from "./auxFunctions";


export const visualizeDijkstra = (nodesMatrix, variables) => {
  
  const {startNodeRow, startNodeCol, endNodeRow, endNodeCol, speed} = variables;

  //clear all styles before running animation again
  clearAllNodesStyles();

  const startNode = nodesMatrix[startNodeRow][startNodeCol];
  const endNode = nodesMatrix[endNodeRow][endNodeCol];

  const visitedNodesInOrder = dijkstra(nodesMatrix, startNode, endNode);
  const shortestPath = getNodesInShortestPathOrder(endNode);
  
  animateDijkstra(visitedNodesInOrder, shortestPath, speed);
}; 


export const dijkstra = (nodesMatrix, startNode, endNode) => {
  
    const visitedNodesInOrder = [];  
    
    startNode.distance = 0;  
    
    const unvisitedNodes = createNodesMap(nodesMatrix);

    while(!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();

      if(closestNode.isWall) continue;
      if(closestNode.distance === Infinity) return visitedNodesInOrder;
     
      closestNode.visited = true;
      visitedNodesInOrder.push(closestNode);

      if(closestNode === endNode) return visitedNodesInOrder;
      
      updateUnvisitedNeighbors(closestNode, nodesMatrix);
    }
  };

export const clearAllNodesStyles = () => {
  const allNodes = [...document.getElementsByClassName('node')];
  allNodes.forEach(node => node.classList.remove('node-shortest-path', 'node-visited'));
};

export const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder, speed) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, speed * i);
        return;
      };
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited');
      }, speed * i);
    };
};

const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-shortest-path') 
      }, 25 * i);
    }
};