import { useState } from "react";
import { visualizeAstar } from "../algorithms/Astar";
import { resetMatrix } from "../algorithms/auxFunctions";
import { visualizeBFS } from "../algorithms/BFS";
import { visualizeDFS } from "../algorithms/DFS";
import { visualizeDijkstra } from "../algorithms/dijkstra";
import { createRandomWalls } from "../algorithms/randomWalls";

const Navbar = ({ state, handleState }) => {

    const {
        nodesMatrix,
        startNodeRow,
        startNodeCol,
        endNodeRow,
        endNodeCol } = state;

    const { setNodesMatrix } = handleState;
    
    const algorithms = [
    {
        "name": "Dijkstra's Algorithm", 
        "algorithm": visualizeDijkstra
    },
    {
        "name": 'A* Algorithm',
        "algorithm": visualizeAstar
    },
    {
        "name": 'Breadth First Search',
        "algorithm": visualizeBFS
    },
    {
        "name": 'Depth First Search',
        "algorithm": visualizeDFS
    }
];

    const mazes = [
        {
        "name": 'Random Maze',
         'algorithm': createRandomWalls
        },
        {
        "name": 'Maze two',
         "algorithm": 'Maze Two'
        }
    ];

    const speedOptions = { 
        'Fast': 3 ,
        'Normal': 9 ,
        'Slow': 15
    };


    const [selectedAlgo, setSelectedAlgo] = useState('Algorithms');
    const [speed, setSpeed] = useState(speedOptions['Normal']);

    const visualizeAlgorithm = () => {
        if(selectedAlgo === 'Algorithms') return;


        resetMatrix(nodesMatrix);
        const userSelection = algorithms.filter((algo) => algo.name === selectedAlgo)[0];
        const { algorithm } = userSelection;
        const startNode = nodesMatrix[startNodeRow][startNodeCol];
        const endNode = nodesMatrix[endNodeRow][endNodeCol];

        algorithm(nodesMatrix, { startNode, endNode, speed });
    };

    const createMaze = (algoName) => {
        //if(selectedMaze === 'Mazes & patterns') return;

        const freshMatrix = resetMatrix(nodesMatrix, true);
        const userSelection = mazes.filter((maze) => maze.name === algoName)[0];
        const { algorithm } = userSelection;
        const newBoard = algorithm(freshMatrix);

        setNodesMatrix(newBoard);
    }

    const clearBoard = () => {
        const freshMatrix = resetMatrix(nodesMatrix, true);
        setNodesMatrix(freshMatrix);
    };



    const parentStyles = 'group hover:cursor-pointer hover:bg-emerald-500 relative w-full h-full text-white py-4 font-semibold transition-colors duration-200';
    const childStyles = 'flex place-content-center px-6 transition-colors duration-200'
    const dropdownMenuStyles = 'cursor-default p-2 rounded-md z-10 text-left bg-gray-800 transition-all duration-200';
    const optionsStyles = 'hover:cursor-pointer font-semibold hover:bg-emerald-500 rounded-md p-1 my-0.5 w-auto transition-colors duration-200';

    return (
        <div className="w-full h-8/12 flex place-content-center gap-1 px-36 bg-gray-800">
            <button className={parentStyles}>
                <div className={childStyles}>
                        {selectedAlgo}
                    <div className="ml-auto">▼</div>
                </div>
                <div className="group-hover:visible cursor-default z-10 invisible bg-transparent mt-5 absolute w-full">
                    <div className={dropdownMenuStyles}>
                        {algorithms.map((algo, index) => {
                            return(
                                <h4 key={index} onClick={() => setSelectedAlgo(algo.name)} className={`${optionsStyles} ${selectedAlgo === algo.name && 'bg-emerald-600'}`}>{algo.name}</h4>
                            )
                        })}
                    </div>
                </div>
            </button>
            <button className={parentStyles}>
                <div className={childStyles}>
                    <div>
                        Mazes {'&'} patterns
                    </div>
                    <div className="ml-auto">▼</div>
                </div>
                <div className="group-hover:visible cursor-default z-10 invisible bg-transparent mt-5 absolute w-full">
                    <div className={dropdownMenuStyles}>
                        {mazes.map((maze, index) => {
                            return (
                                <h4 key={index} onClick={() => createMaze(maze.name)} className={optionsStyles}>{maze.name}</h4>
                            )
                        })}
                    </div>
                </div>
            </button>
            <button onClick={visualizeAlgorithm} className={`${ parentStyles } bg-emerald-500 hover:bg-emerald-600`}>
                <div className={childStyles}>
                    {selectedAlgo === 'Algorithms' ? 'Pick an algorithm!' : 'Search Path'}
                </div>
            </button>
            <button onClick={clearBoard} className={parentStyles}>
                <div className={childStyles}>
                    Clear Board
                </div>
            </button>
            <button className={parentStyles}>
                <div className={childStyles}>
                    <div>
                        Speed
                    </div>
                    <div className="ml-auto">▼</div>
                </div>
                <div className="group-hover:visible cursor-default z-10 invisible bg-transparent mt-5 absolute w-full">
                    <div className={dropdownMenuStyles}>
                        <h4 onClick={() => setSpeed(speedOptions.Fast)} className={`${optionsStyles} ${speed === 3 && 'bg-emerald-600'}`}>Fast</h4>
                        <h4 onClick={() => setSpeed(speedOptions.Normal)} className={`${optionsStyles} ${speed === 9 && 'bg-emerald-600'}`}>Normal</h4>
                        <h4 onClick={() => setSpeed(speedOptions.Slow)} className={`${optionsStyles} ${speed === 15 && 'bg-emerald-600'}`}>Slow</h4>
                    </div>
                </div>
            </button>
        </div>
    )
};

export default Navbar