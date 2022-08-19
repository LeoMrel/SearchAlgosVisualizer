import { memo } from "react"

const Node = memo(function Node({ nodesMatrix, row, col, isStart, isEnd, updateNodes, handleMouseState }) {

    const { isMouseDown, setIsMouseDown } = handleMouseState;

    const handleMouseDown = () => isStart ? setIsMouseDown(1) : isEnd ? setIsMouseDown(2) : setIsMouseDown(3);

    const handleMouseUp = (e) => {
        
        setIsMouseDown(0);

        if(isMouseDown === 1) {
            const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);
            updateNodes(true, parseInt(newParentRow), parseInt(newParentCol));
        }

        if(isMouseDown === 2) {
            const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);
            updateNodes(false, parseInt(newParentRow), parseInt(newParentCol));
        };
    }

    const handleMouseOver = (e) => { 
        const newParent = e.target;

        //dragging start node
        if(isMouseDown === 1) {
            newParent.classList.add('start-node');
            const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);
            nodesMatrix[newParentRow][newParentCol].isStart = true;
            
            //const isEndNode = newParent.classList.contains('end-node');
            //if(!isEndNode) skip to next sibling <-- Handle Later
        }

        //dragging end node
        if(isMouseDown === 2) {
            newParent.classList.add('end-node');
            const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);
            nodesMatrix[newParentRow][newParentCol].isEnd = true;
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

    return (
        <div id={`node-${ row }-${ col }`} 
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave} 
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp}
        className={
        `${isStart ? 'start-node cursor-grab' : isEnd ? 'end-node cursor-grab' : ''}
         ${isMouseDown === 1 || isMouseDown === 2 ? 'cursor-grabbing' : ''}
         node flex place-items-center place-content-center w-8 h-8 border border-black`} />
    )
});

export default Node