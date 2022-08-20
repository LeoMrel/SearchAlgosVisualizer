import { memo } from "react"

const Node = memo(function Node({ nodesMatrix, row, col, isStart, isEnd, isWall, updateNodes, handleMouseState, handleWallsState }) {

    const { isMouseDown, setIsMouseDown } = handleMouseState;
    const { updateWalls, setUpdateWalls} = handleWallsState;

    const handleMouseDown = () => isStart ? setIsMouseDown(1) : isEnd ? setIsMouseDown(2) : setIsMouseDown(3); // <-- Still need to add walls

    const handleMouseUp = (e) => {
        setIsMouseDown(0);
        const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);

        if(isMouseDown === 1) updateNodes(true, parseInt(newParentRow), parseInt(newParentCol));

        if(isMouseDown === 2) updateNodes(false, parseInt(newParentRow), parseInt(newParentCol));

    }

    const handleMouseOver = (e) => { 
        const newParent = e.target;
        const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);

        //dragging start node
        if(isMouseDown === 1) {
            //const colides = newParent.classList.contains('end-node');
            //if(colides) skip to next sibling <-- Handle Later

            newParent.classList.add('start-node');
            nodesMatrix[newParentRow][newParentCol].isStart = true;  
        };

        //dragging end node
        if(isMouseDown === 2) {
            //const colides = newParent.classList.contains('start-node');
            //if(colides) skip to next sibling <-- Handle Later

            newParent.classList.add('end-node');
            nodesMatrix[newParentRow][newParentCol].isEnd = true;
        }

        if(isMouseDown === 3) {
            const nodePointer = nodesMatrix[newParentRow][newParentCol];
            const isNotAWall = nodePointer.isWall === false;

            if(isNotAWall) {
                nodePointer.isWall = true;
                newParent.classList.add('wall-node');
            } else {
                nodePointer.isWall = false;
                newParent.classList.remove('wall-node');
            }
        }
    };

    const handleMouseLeave = (e) => {
        const prevParent = e.target;
        const [prevRow, prevCol] = prevParent.id.match(/\d+/g);

        if(isMouseDown === 1) {
            prevParent.classList.remove('start-node');
            nodesMatrix[prevRow][prevCol].isStart = false;
        };
        
        if(isMouseDown === 2) {
            prevParent.classList.remove('end-node');
            nodesMatrix[prevRow][prevCol].isEnd = false;
        };
    }

    const handleClick = (e) => {
        const target = e.target;
        const isWall = target.classList.contains('wall-node');
        const [row, col] = target.id.match(/\d+/g);
        const nodePointer = nodesMatrix[row][col];

        if(isWall) {
            nodePointer.isWall = false;
            target.classList.remove('wall-node');
        } else {
            nodePointer.isWall = true;
            target.classList.add('wall-node');
        }
    }

    return (
        <div id={`node-${ row }-${ col }`} 
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave} 
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onClick={(isStart || isEnd) ? null : handleClick}
        className={
        `${isStart ? 'start-node cursor-grab' : isEnd ? 'end-node cursor-grab' : isWall ? 'wall-node' : ''}
         ${isMouseDown === 1 || isMouseDown === 2 ? 'cursor-grabbing' : ''}
         node flex place-items-center place-content-center w-8 h-8 border border-black`} />
    )
});

export default Node