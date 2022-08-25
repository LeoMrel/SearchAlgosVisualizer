import React from 'react';
import Node from './Node';

const Grid = ({state, handleState}) => {

    const { nodesMatrix, isMouseDown, isRunningAnimation } = state;
    const { updateNodes, setIsMouseDown, setIsRunningAnimation } = handleState;

    const handleOutOfBoundaries = (e) => {
        const prevParent = e.target.id ? e.target : null;
        if (isMouseDown === 1 || isMouseDown === 2) {
            if (prevParent) {
                const [prevRow, prevCol] = prevParent.id.match(/\d+/g);
                const nodePointer = nodesMatrix[prevRow][prevCol];

                if (isMouseDown === 1) nodePointer.isStart = true;

                if (isMouseDown === 2) nodePointer.isEnd = true;

                const mouseEvent = new Event('mouseup', {'bubbles': true, 'cancelable': true});
                prevParent.dispatchEvent(mouseEvent);
            }
        }
    };


    return (
        <div className="flex flex-col w-full m-auto">
            <div id="grid-boundary" onMouseLeave={handleOutOfBoundaries}>
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
                                    handleState={{ nodesMatrix, updateNodes }}
                                    handleMouseState={{ isMouseDown, setIsMouseDown }} />
                            })}
                        </div>
                    )
                })
                }
            </div>
        </div>
    )

};

export default Grid