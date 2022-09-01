import { COLUMNS, ROWS } from "../Constants";
import {animateWalls, clearAllNodesStyles} from './auxFunctions'


let wallsToAnimate = [];

export const visualizeRecursiveWalls = (matrix, setNodesMatrix, isVerticalSkew, setIsRunningAnimation) => {

    const wallsToAnimate = buildRecursiveWalls(matrix, isVerticalSkew);
    clearAllNodesStyles(true);
    animateWalls(wallsToAnimate, matrix, setNodesMatrix, setIsRunningAnimation);
}


//work on this
const buildRecursiveWalls = (matrix, isVerticalSkew) => {
    wallsToAnimate = [];

    //set walls around the board
    for(let col = 0; col < COLUMNS; col++) {
        const node = matrix[0][col];
        const {isStart, isEnd} = node;
        node.isWall = isStart || isEnd ? false : true;

        !(isStart || isEnd) && wallsToAnimate.push([0, col]);
    };
    for(let row = 0; row < ROWS; row++) {
        const node = matrix[row][COLUMNS - 1];
        const {isStart, isEnd} = node;
        node.isWall = isStart || isEnd ? false : true;

        !(isStart || isEnd) && wallsToAnimate.push([row, COLUMNS - 1]);
    };
    for(let col = COLUMNS - 1; col >= 0 ; col--) {
        const node = matrix[ROWS - 1][col];
        const {isStart, isEnd} = node;
        node.isWall = isStart || isEnd ? false : true;

        !(isStart || isEnd) && wallsToAnimate.push([ROWS - 1, col]);
    };
    for(let row = ROWS - 1; row >= 0 ; row--) {
        const node = matrix[row][0];
        const {isStart, isEnd} = node;
        node.isWall = true;

        !(isStart || isEnd) && wallsToAnimate.push([row, 0]);
    };
    
    isVerticalSkew ?
    helperVertical(matrix, 0, COLUMNS - 1, 0, ROWS - 1)
    : helperHorizontal(matrix, 0, COLUMNS - 1, 0, ROWS - 1)

    return wallsToAnimate;
};


function helperVertical(matrix, x1, x2, y1, y2) {
  let width = x2 - x1;
  let height = y2 - y1;

  if (width >= height) {
    // Vertical bisection
    if (x2 - x1 > 2) {
      let bisection = Bisect(x1, x2);
      let max = Max(y2);
      let min = Min(y1);
      let passage = Passage(max, min);
      let first = false;
      let second = false;

      if (!matrix[y2][bisection].isWall) {
        passage = max;
        first = true;
      }
      if (!matrix[y1][bisection].isWall) {
        passage = min;
        second = true;
      }

      for (let i = y1 + 1; i < y2; i++) {
        if (first && second) {
          if (i === max || i === min) {
            matrix[i][bisection].isWall = false;
          }
        } else if (i === passage) {
            matrix[i][bisection].isWall = false;
        } else {
          wallsToAnimate.push([i, bisection]);
          matrix[i][bisection].isWall = true;
        }
      }
      helperVertical(matrix, x1, bisection, y1, y2);
      helperVertical(matrix, bisection, x2, y1, y2);
    }
  } else {
    if (y2 - y1 > 3) {
      let bisection = Bisect(y1, y2);
      let max = Max(x2);
      let min = Min(x1);
      let passage = Passage(max, min);
      let first = false;
      let second = false;

      if (!matrix[bisection][x2].isWall) {
        passage = max;
        first = true;
      }
      if (!matrix[bisection][x1].isWall) {
        passage = min;
        second = true;
      }

      for (let i = x1 + 1; i < x2; i++) {
        if (first && second) {
          if (i === max || i === min) {
            matrix[bisection][i].isWall = false;
          }
        } else if (i === passage) {
            matrix[bisection][i].isWall = false;
        } else {
          wallsToAnimate.push([bisection, i]);
          matrix[bisection][i].isWall = true;
        }
      }
      helperVertical(matrix, x1, x2, y1, bisection);
      helperVertical(matrix, x1, x2, bisection, y2);
    }
};
};

function helperHorizontal(matrix, x1, x2, y1, y2) {
    let width = x2 - x1;
    let height = y2 - y1;
  
    if (width >= height) {
      // Horizontal bisection
        if (y2 - y1 > 5) {
            let bisection = Bisect(y1, y2);
            let max = Max(x2);
            let min = Min(x1);
            let passage = Passage(max, min);
            let first = false;
            let second = false;
      
            if (!matrix[bisection][x2].isWall) {
              passage = max;
              first = true;
            }
            if (!matrix[bisection][x1].isWall) {
              passage = min;
              second = true;
            }
      
            for (let i = x1 + 1; i < x2; i++) {
              if (first && second) {
                if (i === max || i === min) {
                    matrix[bisection][i].isWall = false;
                }
              } else if (i === passage) {
                matrix[bisection][i].isWall = false;
              } else {
                wallsToAnimate.push([bisection, i]);
                matrix[bisection][i].isWall = true;
              }
            }
            helperHorizontal(matrix, x1, x2, y1, bisection);
            helperHorizontal(matrix, x1, x2, bisection, y2);
        }
      else if (x2 - x1 > 2) {
        let bisection = Bisect(x1, x2);
        let max = Max(y2);
        let min = Min(y1);
        let passage = Passage(max, min);
        let first = false;
        let second = false;
  
        if (!matrix[y2][bisection].isWall) {
          passage = max;
          first = true;
        }
        if (!matrix[y1][bisection].isWall) {
          passage = min;
          second = true;
        }
  
        for (let i = y1 + 1; i < y2; i++) {
          if (first && second) {
            if (i === max || i === min) {
                matrix[i][bisection].isWall = false;
            }
          } else if (i === passage) {
            matrix[i][bisection].isWall = false;
          } else {
            wallsToAnimate.push([i, bisection]);
            matrix[i][bisection].isWall = true;
          }
        }
        helperHorizontal(matrix, x1, bisection, y1, y2);
        helperHorizontal(matrix, bisection, x2, y1, y2);
      }
  }
};


function Passage(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Bisect(a, b) {
  return Math.ceil((a + b) / 2);
}

function Max(a) {
  return a - 1;
}

function Min(a) {
  return a + 1;
}