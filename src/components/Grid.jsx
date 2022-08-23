import React, { useState, useEffect } from 'react';
import { clearAllNodesStyles, visualizeDijkstra } from '../algorithms/dijkstra'
import Node from './Node';

const COLUMNS = 60;
const ROWS = 25;

const Grid = () => {

    const [nodesMatrix, setNodesMatrix] = useState([]);
    const [speed, setSpeed] = useState(5);

    const [startNodeRow, setStartNodeRow] = useState(6);
    const [startNodeCol, setStartNodeCol] = useState(10);
    const [endNodeRow, setEndNodeRow] = useState(6);
    const [endNodeCol, setEndNodeCol] = useState(17);

    // 1 to move 'start' node;
    // 2 to move 'end' node;
    // 3 to create a wall;
    const [isMouseDown, setIsMouseDown] = useState(0);
    

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

    const resetMatrix = (matrix) => {
        const copyCat = [...matrix]

            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const node = copyCat[row][col];
                    const newNode = {
                        ...node,
                        distance: Infinity,
                        previousNode: null,
                        visited: false,
                        isWall: node.isStart || node.isEnd ? false : node.isWall
                    }

                    copyCat[row][col] = newNode;
                };
            };

        return copyCat
    };

    const updateNodes = (isWall, isStart, newRow, newCol)  => {
            const newGrid = resetMatrix(nodesMatrix);

            if(isWall) return setNodesMatrix(newGrid);

            if (isStart) {
                setStartNodeRow(newRow);
                setStartNodeCol(newCol);
            } else {
                  setEndNodeRow(newRow);
                  setEndNodeCol(newCol);  
            };

            setNodesMatrix(newGrid);
    };


    return (
            <div className="flex flex-col self-center">
                {nodesMatrix.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='flex'>
                            {row.map((node, index) => {

                                const { row, col, isWall, isStart, isEnd } = node;

                                return <Node
                                    key={index}
                                    row={row}
                                    col={col}
                                    isWall={isWall}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    handleState={{nodesMatrix, updateNodes}}
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
    )

};

export default Grid