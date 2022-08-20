import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { clearAllNodesStyles, visualizeDijkstra } from '../algorithms/dijkstra'
import Node from './Node';

const COLUMNS = 5;
const ROWS = 5;

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
    const [updateWalls, setUpdateWalls] = useState(false);


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
                        isWall: false,
                        distance: Infinity,
                        visited: false,
                        previousNode: null
                    });
                };
                cells.push(currentRow);
            };
            
        setNodesMatrix(cells);
    }, [startNodeRow, startNodeCol, endNodeRow, endNodeCol, updateWalls]);

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
            <div className="flex flex-col self-center">
                {nodesMatrix.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='flex'>
                            {row.map((node, index) => {

                                const { row, col, isStart, isEnd, isWall } = node;

                                return <Node
                                    key={index}
                                    nodesMatrix={nodesMatrix}
                                    row={row}
                                    col={col}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    isWall={isWall}
                                    updateNodes={updateNodes}
                                    handleMouseState={{isMouseDown, setIsMouseDown}}
                                    handleWallsState={{updateWalls, setUpdateWalls}} />
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

};

export default Grid