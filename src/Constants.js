import { clearAllNodesStyles } from "./algorithms/dijkstra";

export const COLUMNS = 65;
export const ROWS = 28;

export const resetMatrix = (matrix, isReset) => {
  const matrixRef = [...matrix]

  for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
          const node = matrixRef[row][col];
          node.distance = Infinity;
          node.previousNode = null;
          node.visited = false;
          node.isWall = (isReset || node.isStart || node.isEnd) ? false : node.isWall
      };
  };

  isReset && clearAllNodesStyles();
  return matrixRef
};