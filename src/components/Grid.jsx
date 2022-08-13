import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { visualizeDijkstra } from '../algorithms/dijkstra'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Node from './Node';

const COLUMNS = 5;
const ROWS = 5;

const Grid = () => {

    const [nodesMatrix, setNodesMatrix] = useState([]);
    const [speed, setSpeed] = useState(10);

    const [startNodeRow, setStartNodeRow] = useState(0);
    const [startNodeCol, setStartNodeCol] = useState(0);

    const [endNodeRow, setEndNodeRow] = useState(4);
    const [endNodeCol, setEndNodeCol] = useState(4);

    const [draggedItem, setDraggedItem] = useState('');


//Initializes Grid
    useEffect(() => {
        const cells = [];
        const startNodeRow = 0;
        const startNodeCol = 0;
        const endNodeRow = 4;
        const endNodeCol = 4;

        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLUMNS; col++) {
                currentRow.push({
                    row,
                    col,
                    isStart: row === startNodeRow && col === startNodeCol,
                    isEnd: row === endNodeRow && col === endNodeCol,
                    distance: Infinity,
                    visited: false,
                    previousNode: null
                });
            };
            cells.push(currentRow);
        };

       setNodesMatrix(cells)
    }, []);





    const updateNodeMatrix = useCallback(
        (isStart, newRow, newCol) => {
            const dragItem = isStart ? nodesMatrix[startNodeRow][startNodeCol] : nodesMatrix[endNodeRow][endNodeCol]
            const hoverItem = nodesMatrix[newRow][newCol];
            // Swap places of dragItem and hoverItem in the pets array
            
            console.log(nodesMatrix)

            if(isStart) {
                dragItem.isStart = false;
                hoverItem.isStart = true;
                setStartNodeRow(newRow);
                setStartNodeCol(newCol);
            } else {
                dragItem.isEnd = false;
                hoverItem.isEnd = true;
                setEndNodeRow(newRow);
                setEndNodeCol(newCol);
            }

        },
        [nodesMatrix, startNodeRow, startNodeCol, endNodeRow, endNodeCol],
    )


    return (
        <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col self-center">
            {nodesMatrix.map((row, rowIndex) => {
                return(
                    <div key={rowIndex} className='flex'>
                    {row.map((node, index) => {

                        const { row, col, isStart, isEnd } = node;

                        return <Node
                                key={index}
                                row={row}
                                col={col}
                                isStart={isStart}
                                isEnd={isEnd}
                                updateNodeMatrix={updateNodeMatrix} />
                        })}
                    </div>
                )
            })
            }
    
    <button 
    onClick={() => visualizeDijkstra(nodesMatrix, { startNodeRow, startNodeCol, endNodeRow, endNodeCol, speed })}
    className="h-20 w-full text-white hover:bg-blue-800 bg-blue-700 place-self-end">
        Search Path
    </button>
        </div>
        </DndProvider>
    )

}

export default Grid