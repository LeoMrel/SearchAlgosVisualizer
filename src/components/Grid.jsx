import React, { memo, useState } from 'react';
import { useEffect } from 'react';
import { clearAllNodesStyles, visualizeDijkstra } from '../algorithms/dijkstra'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Node from './Node';

const COLUMNS = 5;
const ROWS = 5;

const Grid = memo(function Grid() {

    const [nodesMatrix, setNodesMatrix] = useState([]);
    const [speed, setSpeed] = useState(10);

    const [startNodeRow, setStartNodeRow] = useState(0);
    const [startNodeCol, setStartNodeCol] = useState(0);
    const [endNodeRow, setEndNodeRow] = useState(4);
    const [endNodeCol, setEndNodeCol] = useState(4);


    //Initializes Grid
    useEffect(() => {
        const cells = [];

        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLUMNS; col++) {
                currentRow.push({
                    accepts: ['start', 'end'],
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

        setNodesMatrix(cells);

    }, [startNodeRow, startNodeCol, endNodeRow, endNodeCol]);

    const updateNodes = (isStart, newRow, newCol) => {
        clearAllNodesStyles();
        // Swap places of dragItem and hoverItem in the pets array
        if (isStart) {
            setStartNodeRow(newRow);
            setStartNodeCol(newCol);
        } else {
            setEndNodeRow(newRow);
            setEndNodeCol(newCol);
        }
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col self-center">
                {nodesMatrix.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='flex'>
                            {row.map((node, index) => {

                                const { accepts, row, col, isStart, isEnd } = node;

                                return <Node
                                    key={index}
                                    accept={accepts}
                                    row={row}
                                    col={col}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    updateNodes={updateNodes} />
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

})

export default Grid