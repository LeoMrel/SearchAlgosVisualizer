import { memo } from "react";
import { useDrag, useDrop } from "react-dnd/dist/hooks"

const Node = memo(function Node({ row, col, isStart, isEnd, updateNodes}) {

    const [{ isDraggingStart }, startDragRef] = useDrag({
        type: 'node',
        item: {isStart: true},
        options: {
            dropEffect: 'move'
        },
        collect: (monitor) => ({
            isDraggingStart: monitor.isDragging()
        })
    })

    const [{ isDraggingEnd }, endDragRef] = useDrag({
        type: 'node',
        item: {isStart: false},
        options: {
            dropEffect: 'move'
        },
        collect: (monitor) => ({
            isDraggingEnd: monitor.isDragging()
        })
    })

    const [, dropRef] = useDrop({
        accept: ['node'],
        hover: (node, monitor) => {
            const test = monitor.getItem().isStart;

            console.log(test)
            updateNodes(test, row, col);
        }
    });


    return (
        <div id={`node-${ row }-${ col }`} ref={isStart || isEnd ? null : dropRef} className={`node flex place-items-center place-content-center w-8 h-8 border border-black`}>
            { isStart && 
            <div ref={startDragRef} draggable={true} className="start cursor-grab bg-green-500 w-full h-full flex place-content-center">
            <i className="border-r-8 border-t-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
            </div>
            }
            { isEnd && 
            <div ref={endDragRef} draggable={true} className="end relative z-1 cursor-grab bg-red-500 w-full h-full flex place-content-center" >
            <i className="border-l-8 border-b-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
            </div>
            }
        </div>
    )
});

export default Node