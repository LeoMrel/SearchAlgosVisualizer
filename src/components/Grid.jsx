import React, { useState } from 'react';
import { useEffect } from 'react';
import Node from './Node';
import { visualizeDijkstra } from '../algorithms/dijkstra'

const COLUMNS = 30;
const ROWS = 20;

const Grid = () => {

    const [nodesMatrix, setNodesMatrix] = useState([]);
    const [speed, setSpeed] = useState(10);

    const [startNodeRow, setStartNodeRow] = useState(8);
    const [startNodeCol, setStartNodeCol] = useState(8);

    const [endNodeRow, setEndNodeRow] = useState(8);
    const [endNodeCol, setEndNodeCol] = useState(19);

    const [draggedItem, setDraggedItem] = useState('');


//Initializes Grid
    useEffect(() => {
        const cells = [];
        const startNodeRow = 8;
        const startNodeCol = 8;
        const endNodeRow = 8;
        const endNodeCol = 19;

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

        return () => setNodesMatrix(cells)
    }, []);


    return (
        <div className="flex flex-col self-center">
            {nodesMatrix.map((row, rowIndex) => {
                return(
                    <div key={rowIndex} className='flex'>
                    {row.map((node, index) => {

                        const { row, col, isStart, isEnd } = node;

                        return <Node 
                                key={index}
                                nodeMatrix={nodesMatrix}
                                stateHandling={{setStartNodeRow, setStartNodeCol, setEndNodeRow, setEndNodeCol }}
                                dragStateHandling={{ draggedItem, setDraggedItem }}
                                row={row}
                                col={col}
                                isStart={isStart}
                                isEnd={isEnd} />
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
    )

}

export default Grid