import { memo, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd/dist/hooks"

const Node = memo(function Node({ row, col, isStart, isEnd, updateNodes, handleMouseState }) {


    const {isMouseDown, setIsMouseDown} = handleMouseState;

    /*const [, draggingRef] = useDrag({
        type: 'node',
        item: isStart ? { isStart: true } : { isStart: false },
        options: {
            dropEffect: 'move'
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: 'node',
        hover: useCallback((node, monitor) => {
            const isStart = monitor.getItem().isStart;
            updateNodes(isStart, row, col);
        }, [updateNodes, row, col])
    });*/


    const handleMouseDown = () => isStart ? setIsMouseDown(1) : isEnd ? setIsMouseDown(2) : setIsMouseDown(3);

    const handleMouseUp = (e) => {
        if(isMouseDown === 1) {
            const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);
            updateNodes(true, parseInt(newParentRow), parseInt(newParentCol));   
        };

        if(isMouseDown === 2) {
            const [newParentRow, newParentCol] = e.target.id.match(/\d+/g);
            updateNodes(false, parseInt(newParentRow), parseInt(newParentCol));
        };
        setIsMouseDown(0);
    }

    const handleMouseOver = (e) => {
        //dragging start node
        if(isMouseDown === 1) {
            const newParent = e.target;
            newParent.classList.add('start-node');
        }
        //dragging end node
        else if(isMouseDown === 2) {
            const newParent = e.target;
            newParent.classList.add('end-node');
        }
    };

    const handleMouseLeave = (e) => {
        if(isMouseDown === 1) {
            const prevParent = e.target;
            prevParent.classList.remove('start-node')
        }
        else if(isMouseDown === 2) {
            const prevParent = e.target;
            prevParent.classList.remove('end-node')
        }
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