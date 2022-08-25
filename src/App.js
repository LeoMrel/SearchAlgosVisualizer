import { useEffect, useState } from 'react';
import { clearAllNodesStyles } from './algorithms/dijkstra';
import Container from './components/Container';
import Grid from './components/Grid';
import Navbar from './components/Navbar';
import { COLUMNS, resetMatrix, ROWS } from './Constants';

function App() {
  
  const [nodesMatrix, setNodesMatrix] = useState([]);

  const [startNodeRow, setStartNodeRow] = useState(6);
  const [startNodeCol, setStartNodeCol] = useState(10);
  const [endNodeRow, setEndNodeRow] = useState(6);
  const [endNodeCol, setEndNodeCol] = useState(17);

  // 1 to move 'start' node;
  // 2 to move 'end' node;
  // 3 to create a wall;
  const [isMouseDown, setIsMouseDown] = useState(0);
  const [isRunningAnimation, setIsRunningAnimation] = useState(false);

  //Initializes Grid
  useEffect(() => {
      const cells = [];
      const startNodeRow = 6;
      const startNodeCol = 10;
      const endNodeRow = 6;
      const endNodeCol = 17;

      for (let row = 0; row < ROWS; row++) {
          const currentRow = [];
          for (let col = 0; col < COLUMNS; col++) {
              const node = {
                  row,
                  col,
                  isWall: false,
                  isStart: row === startNodeRow && col === startNodeCol,
                  isEnd: row === endNodeRow && col === endNodeCol,
                  distance: Infinity,
                  visited: false,
                  previousNode: null
              };
              currentRow.push(node);
          };
          cells.push(currentRow);
      };

      setNodesMatrix(cells);
  }, []);

  useEffect(() => {
    clearAllNodesStyles();
}, [isMouseDown]);


const updateNodes = (isWall, isStart, newRow, newCol) => {
    const newGrid = resetMatrix(nodesMatrix, false);

    if (isWall) return setNodesMatrix(newGrid);

    if (isStart) {
        setStartNodeRow(newRow);
        setStartNodeCol(newCol);
    } else {
        setEndNodeRow(newRow);
        setEndNodeCol(newCol);
    };

    return setNodesMatrix(newGrid);
};


  return (
      <Container>
      <Navbar 
      state={{
        nodesMatrix, 
        startNodeRow, 
        startNodeCol, 
        endNodeRow, 
        endNodeCol }}
      handleState={{ updateNodes, setNodesMatrix}} />
      <Grid 
      state={{ nodesMatrix, isMouseDown, isRunningAnimation }} 
      handleState={{ updateNodes, setIsMouseDown, setIsRunningAnimation }} />
      </Container>
  );
}

export default App;
