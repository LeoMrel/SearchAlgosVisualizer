import React, { useState } from 'react';
import { useEffect } from 'react';
import Node from './Node';
import { visualizeDijkstra } from '../algorithms/dijkstra'

const COLUMNS = 20;
const ROWS = 30;

const Grid = () => {

    const [nodesMatrix, setNodesMatrix] = useState([]);
    const [speed, setSpeed] = useState(10);

    const [startNodeRow, setStartNodeRow] = useState(0);
    const [startNodeCol, setStartNodeCol] = useState(0);

    const [endNodeRow, setEndNodeRow] = useState(20);
    const [endNodeCol, setEndNodeCol] = useState(8);

    const [draggedItem, setDraggedItem] = useState('');


//Initializes Grid
    useEffect(() => {
        const cells = [];
        const startNodeRow = 0;
        const startNodeCol = 0;
        const endNodeRow = 20;
        const endNodeCol = 8;

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
        <div className="border border-red-400 border-solid flex self-center">
            {nodesMatrix.map((row, rowIndex) => {
                return(
                    <div key={rowIndex}>
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
    
    <button onClick={() => visualizeDijkstra(nodesMatrix, { startNodeRow, startNodeCol, endNodeRow, endNodeCol, speed })}>
        Search Path
    </button>
        </div>
    )

}

export default Grid