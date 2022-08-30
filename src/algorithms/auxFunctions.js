import { COLUMNS, ROWS } from "../Constants";

export const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
};

export const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const {row, col} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
    return neighbors.filter(neighbor => !neighbor.visited);
};


export const createNodesMap = (grid) => {
    const map = [];
    for (const rows of grid) {
      for (const node of rows) {
        map.push(node);
      };
    };
    
    return map
};
  
  
export const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};
  
// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the invoked algorithm.
export const getNodesInShortestPathOrder = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    };
    
    return nodesInShortestPathOrder;
};


export const resetMatrix = (matrix, isReset) => {
  const matrixRef = [...matrix]

  for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
          const node = matrixRef[row][col];
          node.distance = Infinity;
          node.previousNode = null;
          node.visited = false;
          node.isWall = (isReset || node.isStart || node.isEnd) ? false : node.isWall;
          node.hScore = Infinity;
          node.gScore = Infinity;
          node.fScore = Infinity;
      };
  };

  isReset && clearAllNodesStyles();
  return matrixRef
};


export const clearAllNodesStyles = () => {
  const allNodes = [...document.getElementsByClassName('node')];
  allNodes.forEach(node => node.classList.remove('node-shortest-path', 'node-visited'));
};

export const animateAlgo = (visitedNodesInOrder, nodesInShortestPathOrder, speed) => {
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