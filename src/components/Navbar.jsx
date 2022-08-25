import { useState } from "react";
import { visualizeDijkstra } from "../algorithms/dijkstra";
import { resetMatrix } from "../Constants";

const Navbar = ({ state, handleState }) => {

    const {
        nodesMatrix,
        startNodeRow,
        startNodeCol,
        endNodeRow,
        endNodeCol } = state;

    const { setNodesMatrix } = handleState;
    
    const algorithms = {
        "Dijkstra's algorithm": visualizeDijkstra,
        'A*': 'insert A* function'
    };

    const mazes = {
        'Maze one': 'Maze one',
        'Maze two': 'Maze Two'
    };

    const speedOptions = {
        'Fast': 3,
        'Normal': 9,
        'Slow': 15
    };


    const [selectedAlgo, setSelectedAlgo] = useState('Algorithms');
    const [speed, setSpeed] = useState('Speed');

    const visualizeAlgorithm = () => {
        if(selectedAlgo === 'Algorithms') return;
        const algo = algorithms[selectedAlgo]
        return algo(nodesMatrix, { startNodeRow, startNodeCol, endNodeRow, endNodeCol, speed });
    };

    const clearBoard = () => {
        const freshMatrix = resetMatrix(nodesMatrix, true);
        setNodesMatrix(freshMatrix);
    }



    const dropdownParentStyles = 'group hover:cursor-pointer hover:bg-emerald-500 relative w-full h-full text-white py-4 font-semibold transition-colors duration-200';
    const buttonStyles = 'flex place-content-center px-6 transition-colors duration-200'
    const dropdownMenuStyles = 'cursor-default p-2 rounded-md z-10 text-left bg-gray-800 transition-all duration-200';
    const optionsStyles = 'hover:cursor-pointer font-semibold hover:bg-emerald-500 rounded-md p-1 my-0.5 w-auto transition-colors duration-200';

    return (
        <div className="w-full h-8/12 flex place-content-center gap-1 px-36 bg-gray-800">
            <button className={dropdownParentStyles}>
                <div className={buttonStyles}>
                        {selectedAlgo}
                    <div className="ml-auto">▼</div>
                </div>
                <div className="group-hover:visible cursor-default z-10 invisible bg-transparent mt-5 absolute w-full">
                    <div className={dropdownMenuStyles}>
                        <h4 onClick={() => setSelectedAlgo("Dijkstra's algorithm")} className={optionsStyles}>Dijkstra's algorithm</h4>
                        <h4 onClick={() => setSelectedAlgo('A*')} className={optionsStyles}>A*</h4>
                    </div>
                </div>
            </button>
            <button className={dropdownParentStyles}>
                <div className={buttonStyles}>
                    <div>
                        Mazes {'&'} patterns
                    </div>
                    <div className="ml-auto">▼</div>
                </div>
                <div className="group-hover:visible cursor-default z-10 invisible bg-transparent mt-5 absolute w-full">
                    <div className={dropdownMenuStyles}>
                        <h4 onClick={'#'} className={optionsStyles}>Maze one</h4>
                        <h4 onClick={'#'} className={optionsStyles}>Maze two</h4>
                    </div>
                </div>
            </button>
            <button onClick={visualizeAlgorithm} className={`${ dropdownParentStyles } bg-emerald-500 hover:bg-emerald-600`}>
                <div className={buttonStyles}>
                    Search Path
                </div>
            </button>
            <button onClick={clearBoard} className={dropdownParentStyles}>
                <div className={buttonStyles}>
                    Clear Board
                </div>
            </button>
            <button className={dropdownParentStyles}>
                <div className={buttonStyles}>
                    <div>
                        {
                        typeof speed === 'string' ? speed
                        : Object.keys(speedOptions).find(key => speedOptions[key] === speed)
                        }
                    </div>
                    <div className="ml-auto">▼</div>
                </div>
                <div className="group-hover:visible cursor-default z-10 invisible bg-transparent mt-5 absolute w-full">
                    <div className={dropdownMenuStyles}>
                        <h4 onClick={() => setSpeed(speedOptions.Fast)} className={optionsStyles}>Fast</h4>
                        <h4 onClick={() => setSpeed(speedOptions.Normal)} className={optionsStyles}>Normal</h4>
                        <h4 onClick={() => setSpeed(speedOptions.Slow)} className={optionsStyles}>Slow</h4>
                    </div>
                </div>
            </button>
        </div>
    )
};

export default Navbar