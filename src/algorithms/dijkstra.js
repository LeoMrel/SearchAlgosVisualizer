import { createNodesMap, sortNodesByDistance, getNodesInShortestPathOrder, updateUnvisitedNeighbors, animateAlgo, clearAllNodesStyles } from "./auxFunctions";


export const visualizeDijkstra = (nodesMatrix, variables) => {
  
  const { startNode, endNode, speed, setIsRunningAnimation } = variables;

  //clear all styles before running animation again
  clearAllNodesStyles();

  const visitedNodesInOrder = dijkstra(nodesMatrix, startNode, endNode);
  const shortestPath = getNodesInShortestPathOrder(endNode);
  
  animateAlgo(visitedNodesInOrder, shortestPath, speed, setIsRunningAnimation);
}; 


const dijkstra = (nodesMatrix, startNode, endNode) => {
  
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
