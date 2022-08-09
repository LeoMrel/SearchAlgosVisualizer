import { createNodesMap, getNodesInShortestPathOrder, sortNodesByDistance, updateUnvisitedNeighbors } from "./auxFunctions";


export const visualizeDijkstra = (nodeMatrix, variables) => {
  
  const {startNodeRow, startNodeCol, endNodeRow, endNodeCol, speed} = variables;

  //clear all styles before running animation again
  const allNodes = [...document.getElementsByClassName('node')];
  allNodes.forEach(node => node.classList.remove('node-shortest-path', 'node-visited'));

  const startNode = nodeMatrix[startNodeRow][startNodeCol];
  const endNode = nodeMatrix[endNodeRow][endNodeCol];
  
  const visitedNodesInOrder = dijkstra(nodeMatrix, startNode, endNode);
  const shortestPath = getNodesInShortestPathOrder(endNode);

  animateDijkstra(visitedNodesInOrder, shortestPath, speed);
}; 

const dijkstra = (nodeMatrix, startNode, endNode) => {
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


const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder, speed) => {
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
      }, 10 * i);
    }
};