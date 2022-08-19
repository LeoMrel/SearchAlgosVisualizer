import { memo, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd/dist/hooks"

const Node = memo(function Node({ row, col, isStart, isEnd, updateNodes }) {

    const [, draggingRef] = useDrag({
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
    });

    return (
        <div id={`node-${ row }-${ col }`} ref={isStart || isEnd ? null : dropRef} className={`node flex place-items-center place-content-center w-8 h-8 border border-black`}>
            {isStart &&
                <div ref={draggingRef} className="start cursor-grab bg-green-500 w-full h-full flex place-content-center">
                    <i className="border-r-8 border-t-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
                </div>
            }
            {isEnd &&
                <div ref={draggingRef} className="end relative z-1 cursor-grab bg-red-500 w-full h-full flex place-content-center" >
                    <i className="border-l-8 border-b-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
                </div>
            }
        </div>
    )
});

export default Node