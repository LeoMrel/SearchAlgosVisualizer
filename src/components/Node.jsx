
const Node = ({ row, col, isWall, isStart, isEnd, handleState, handleMouseState }) => {

    const { nodesMatrix, updateNodes } = handleState;
    const { isMouseDown, setIsMouseDown } = handleMouseState;
    

    const handleMouseDown = () => isStart ? setIsMouseDown(1) : isEnd ? setIsMouseDown(2) : setIsMouseDown(3);

    const handleMouseUp = (e) => {
        setIsMouseDown(0);
        const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);

        if(isMouseDown === 1) updateNodes(false, true, parseInt(newParentRow), parseInt(newParentCol));

        if(isMouseDown === 2) updateNodes(false, false, parseInt(newParentRow), parseInt(newParentCol));
    }

    const handleMouseEnter = (e) => { 
        const newParent = e.target;
        const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);
        const nodePointer = nodesMatrix[newParentRow][newParentCol];

        //dragging start node
        if(isMouseDown === 1) {
            //const colides = newParent.classList.contains('end-node');
            //if(colides) skip to next sibling <-- Handle Later

            newParent.classList.add('start-node');
            nodePointer.isStart = true;
        };

        //dragging end node
        if(isMouseDown === 2) {
            //const colides = newParent.classList.contains('start-node');
            //if(colides) skip to next sibling <-- Handle Later

            newParent.classList.add('end-node');
            nodePointer.isEnd = true;
        }

        if(isMouseDown === 3) updateNodes(true, false, newParentRow, newParentCol);
    };

    const handleMouseLeave = (e) => {
        const prevParent = e.target;
        const [prevRow, prevCol] = prevParent.id.match(/\d+/g);
        const nodePointer = nodesMatrix[prevRow][prevCol];

        if(isMouseDown === 1) {
            prevParent.classList.remove('start-node');
            nodePointer.isStart = false;
        };
        
        if(isMouseDown === 2) {
            prevParent.classList.remove('end-node');
            nodePointer.isEnd = false;
        };
    }

    const handleClick = (e) => {
        const target = e.target;
        const [row, col] = target.id.match(/\d+/g);

        updateNodes(true, false, row, col);
    };



    return (
        <div id={`node-${ row }-${ col }`} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onClick={(isStart || isEnd) ? null : handleClick}
        className={
        `${isStart ? 'start-node cursor-grab' : isEnd ? 'end-node cursor-grab' : isWall ? 'wall-node' : ''}
         ${isMouseDown === 1 || isMouseDown === 2 ? 'cursor-grabbing' : ''}
         node flex place-items-center place-content-center w-8 h-8 border border-black`} />
    )
};

export default Node