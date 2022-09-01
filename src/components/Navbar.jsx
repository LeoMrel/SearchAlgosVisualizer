import { useState } from "react";
import { visualizeAstar } from "../algorithms/Astar";
import { resetMatrix } from "../algorithms/auxFunctions";
import { visualizeBFS } from "../algorithms/BFS";
import { visualizeDFS } from "../algorithms/DFS";
import { visualizeDijkstra } from "../algorithms/dijkstra";
import { createRandomWalls } from "../algorithms/randomWalls";
import { visualizeRecursiveWalls } from "../algorithms/recursiveWalls";

const Navbar = ({ state, handleState }) => {

    const {
        nodesMatrix,
        isRunningAnimation,
        startNodeRow,
        startNodeCol,
        endNodeRow,
        endNodeCol } = state;

    const { setNodesMatrix, setIsRunningAnimation } = handleState;
    
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
        "name": 'Recursive Maze (Vertical Skew)',
         "algorithm": visualizeRecursiveWalls
        },
        {
        "name": 'Recursive Maze (Horizontal Skew)',
         "algorithm": visualizeRecursiveWalls
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
        if(selectedAlgo === 'Algorithms' || isRunningAnimation) return; 

        resetMatrix(nodesMatrix, false);
        setIsRunningAnimation(true);
        
        const userSelection = algorithms.filter((algo) => algo.name === selectedAlgo)[0];
        const { algorithm } = userSelection;
        const startNode = nodesMatrix[startNodeRow][startNodeCol];
        const endNode = nodesMatrix[endNodeRow][endNodeCol];
        
        algorithm(nodesMatrix, { startNode, endNode, speed, setIsRunningAnimation });
    };

    const createMaze = (mazeAlgoName) => {
        if(isRunningAnimation) return;

        const freshMatrix = resetMatrix(nodesMatrix, true);
        const userSelection = mazes.filter((maze) => maze.name === mazeAlgoName)[0];
        const { algorithm } = userSelection;
        const isVerticalSkew = userSelection.name.includes('Vertical');

        algorithm(freshMatrix, setNodesMatrix, isVerticalSkew, setIsRunningAnimation);
    }

    const clearBoard = () => {
        if(isRunningAnimation) return;

        const freshMatrix = resetMatrix(nodesMatrix, true);
        setNodesMatrix(freshMatrix);
    };

    const selectSpeed = (userSelection) => {
        if(isRunningAnimation) return;
        setSpeed(userSelection);
    }


    const parentStyles = `group hover:cursor-pointer hover:bg-emerald-500 ${isRunningAnimation ? 'hover:bg-red-500' : 'bg-transparent'} relative w-full h-full text-white py-4 font-semibold transition-colors duration-200`;
    const textStyles = 'flex place-content-center px-6 transition-colors duration-200'
    const dropdownVisivility = `${isRunningAnimation ? '' : 'group-hover:visible'} cursor-default z-10 invisible bg-transparent pt-5 absolute w-full`
    const dropdownMenuStyles = 'cursor-default p-2 rounded-md z-10 text-left bg-gray-800 transition-colors duration-200';
    const optionsStyles = 'hover:cursor-pointer hover:bg-emerald-500 font-semibold rounded-md p-1 my-0.5 w-auto transition-colors duration-200';

    return (
        <div className="w-full h-8/12 flex place-content-center gap-1 px-36 bg-gray-800 shadow-xl">
            <button className={parentStyles}>
                <div className={textStyles}>
                        {selectedAlgo}
                    <div className="ml-auto">▼</div>
                </div>
                <div className={dropdownVisivility}>
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
                <div className={textStyles}>
                    <div>
                        Mazes {'&'} patterns
                    </div>
                    <div className="ml-auto">▼</div>
                </div>
                <div className={dropdownVisivility}>
                    <div className={dropdownMenuStyles}>
                        {mazes.map((maze, index) => {
                            return (
                                <h4 key={index} onClick={() => createMaze(maze.name)} className={optionsStyles}>{maze.name}</h4>
                            )
                        })}
                    </div>
                </div>
            </button>
            <button onClick={visualizeAlgorithm} className={`${ parentStyles } ${isRunningAnimation ? 'bg-red-500' : 'bg-emerald-500 hover:bg-emerald-600' }`}>
                <div className={textStyles}>
                    {selectedAlgo === 'Algorithms' ? 'Pick an algorithm!' : 'Search Path'}
                </div>
            </button>
            <button onClick={clearBoard} className={parentStyles}>
                <div className={textStyles}>
                    Clear Board
                </div>
            </button>
            <button className={parentStyles}>
                <div className={textStyles}>
                    <div>
                        Speed
                    </div>
                    <div className="ml-auto">▼</div>
                </div>
                <div className={dropdownVisivility}>
                    <div className={dropdownMenuStyles}>
                        <h4 onClick={() => selectSpeed(speedOptions.Fast)} className={`${optionsStyles} ${speed === 3 && 'bg-emerald-600'}`}>Fast</h4>
                        <h4 onClick={() => selectSpeed(speedOptions.Normal)} className={`${optionsStyles} ${speed === 9 && 'bg-emerald-600'}`}>Normal</h4>
                        <h4 onClick={() => selectSpeed(speedOptions.Slow)} className={`${optionsStyles} ${speed === 15 && 'bg-emerald-600'}`}>Slow</h4>
                    </div>
                </div>
            </button>
        </div>
    )
};

export default Navbar