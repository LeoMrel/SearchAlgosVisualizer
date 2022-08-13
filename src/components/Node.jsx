import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd/dist/hooks"

const Node = ({row, col, isStart, isEnd, dragStateHandling, updateNodeMatrix}) => {

    const [, startDragRef] = useDrag({
        type: 'start',
        item: {row, col},
        options: {
            dropEffect: 'copy'
        },
    })

    const [, endDragRef] = useDrag({
        type: 'end',
        item: {row, col},
        options: {
            dropEffect: 'copy'
        }
    })

    const [spec, dropRef] = useDrop({
        accept: ['end', 'start'],
        drop: (node, monitor) => {
            const isStart = monitor.getItemType() === 'start';
            updateNodeMatrix(isStart, row, col)
        }
    });


    return (
        <div id={`node-${ row }-${ col }`} ref={isStart || isEnd ? null : dropRef} className={`node relative flex place-items-center place-content-center w-8 h-8 border border-black`}>
            { isStart && 
            <div ref={startDragRef} className="start cursor-grab bg-green-500 w-full h-full flex place-content-center">
            <i className="border-r-8 border-t-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
            </div>
            }
            { isEnd && 
            <div ref={endDragRef} className="end relative z-1 cursor-grab bg-red-500 w-full h-full flex place-content-center" >
            <i className="border-l-8 border-b-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
            </div>
            }
        </div>
    )
};

export default Node