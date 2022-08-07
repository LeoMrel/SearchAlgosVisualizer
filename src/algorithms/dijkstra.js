import { createNodesMap, sortNodesByDistance, updateUnvisitedNeighbors } from "./auxFunctions";

export const dijkstra = (nodeMatrix, startNode, endNode) => {
    startNode.distance = 0;  
    
    const visitedNodesInOrder = [];
    const unvisitedNodes = createNodesMap(nodeMatrix);
    
    while(unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if(closestNode.distance === Infinity) return visitedNodesInOrder;
     
      closestNode.visited = true;
      visitedNodesInOrder.push(closestNode);
      if(closestNode === endNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, nodeMatrix);
    }
  };
  