import React, { memo, useCallback, useState } from 'react';
import { useEffect } from 'react';
import { visualizeDijkstra } from '../algorithms/dijkstra'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Node from './Node';

const COLUMNS = 45;
const ROWS = 15;

const Grid = () => {

    const [nodesMatrix, setNodesMatrix] = useState([]);
    const [speed, setSpeed] = useState(5);

    const [startNodeRow, setStartNodeRow] = useState(0);
    const [startNodeCol, setStartNodeCol] = useState(0);
    const [endNodeRow, setEndNodeRow] = useState(4);
    const [endNodeCol, setEndNodeCol] = useState(4);

    // 1 to move 'start' node;
    // 2 to move 'end' node;
    // 3 to create a wall;
    const [isMouseDown, setIsMouseDown] = useState(0);


    //Initializes Grid
    useEffect(() => {
        const cells = [];
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
            
        setNodesMatrix(cells);
    }, [startNodeRow, startNodeCol, endNodeRow, endNodeCol]);

    const updateNodes = useCallback((isStart, newRow, newCol)  => {
            if (isStart) {
                setStartNodeRow(newRow);
                setStartNodeCol(newCol);
            } else {
                setEndNodeRow(newRow);
                setEndNodeCol(newCol);
            };
    }, []);



    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col self-center">
                {nodesMatrix.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='flex'>
                            {row.map((node, index) => {

                                const { row, col, isStart, isEnd } = node;

                                return <Node
                                    key={index}
                                    nodesMatrix={nodesMatrix}
                                    row={row}
                                    col={col}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    updateNodes={updateNodes}
                                    handleMouseState={{isMouseDown, setIsMouseDown}} />
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

};

export default Grid