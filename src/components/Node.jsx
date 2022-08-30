import { memo } from "react";

const Node = memo(function Node({ row, col, isWall, isStart, isEnd, handleState, handleMouseState }) {

    const { nodesMatrix, updateNodes } = handleState;
    const { isMouseDown, setIsMouseDown } = handleMouseState;

    //This variable helps to prevent the user
    //from stacking the 'start' and 'end' nodes
    //on top of each other. Instead they jump to
    //the next available sibling.
    let prevCollision = null;

    const handleMouseDown = (e) => {
        e.preventDefault();
        isStart ? setIsMouseDown(1) : isEnd ? setIsMouseDown(2) : setIsMouseDown(3);
    };

    const handleMouseUp = (e) => {
        const newParent = e.target.id ? e.target : null;
        const [newParentRow, newParentCol] = newParent.id.match(/\d+/g);

        if (isMouseDown === 1) updateNodes(false, true, parseInt(newParentRow), parseInt(newParentCol));

        if (isMouseDown === 2) updateNodes(false, false, parseInt(newParentRow), parseInt(newParentCol));

        if (isMouseDown === 3) updateNodes(true, false, parseInt(newParentRow), parseInt(newParentCol));

        setIsMouseDown(0);
    };

    const handleMouseEnter = (e) => {
        const newParent = e.target.id ? e.target : null;
        const prevParent = e.relatedTarget;
        const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);
        const nodePointer = nodesMatrix[newParentRow][newParentCol];


        //moving start node
        if (isMouseDown === 1) {
            const collision = isEnd;
            if (!collision) {
                prevParent.classList.remove('start-node');
                newParent.classList.add('start-node');
                nodePointer.isStart = true;
            } else {
                prevCollision = prevParent;
            };
        };

        //moving end node
        if (isMouseDown === 2) {
            const collision = isStart;
            if (!collision) {
                prevParent.classList.remove('end-node');
                newParent.classList.add('end-node');
                nodePointer.isEnd = true;
            } else {
                prevCollision = prevParent;
            }
        }

        //creating walls
        if (isMouseDown === 3) {
            if(!isStart && !isEnd) {
                if (isWall) {
                    newParent.classList.remove('wall-node');
                    nodePointer.isWall = false;
                } else {
                    newParent.classList.add('wall-node');
                    nodePointer.isWall = true;
                };
            }      
        };
    };


    const handleMouseLeave = (e) => {
        const prevParent = e.target.id ? e.target : null;
        const [prevRow, prevCol] = prevParent.id.match(/\d+/g);
        const nodePointer = nodesMatrix[prevRow][prevCol];

        if (isMouseDown === 1) {
            if (prevCollision) prevCollision.classList.remove('start-node');
            nodePointer.isStart = false;
        };

        if (isMouseDown === 2) {
            if (prevCollision) prevCollision.classList.remove('end-node');
            nodePointer.isEnd = false;
        };
    };

    const handleClick = (e) => {
        const target = e.target.id ? e.target : null;
        const [row, col] = target.id.match(/\d+/g);
        const nodePointer = nodesMatrix[row][col];

        if (isWall) {
            target.classList.remove('wall-node');
            nodePointer.isWall = false;
        } else {
            target.classList.add('wall-node');
            nodePointer.isWall = true;
        }
    };


    return (
        <div id={`node-${ row }-${ col }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onClick={(isStart || isEnd) ? null : handleClick}
            className={`${ isStart ? 'start-node' : isEnd ? 'end-node' : isWall ? 'wall-node' : 'bg-white' }
            node w-6 h-6 border border-blue-300`} />
    )
});

export default Node