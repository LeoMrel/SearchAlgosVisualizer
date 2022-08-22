
export const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  

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
}
  
// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method.
export const getNodesInShortestPathOrder = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
      //console.log(currentNode)
    }
    return nodesInShortestPathOrder;
}