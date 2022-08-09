const Node = ({ nodeMatrix, stateHandling, dragStateHandling, row, col, isStart, isEnd }) => {

    const { setStartNodeRow, setStartNodeCol, setEndNodeRow, setEndNodeCol } = stateHandling;
    const { draggedItem, setDraggedItem } = dragStateHandling;

    //Just handling the 'start' node for now
    const handleDragStart = (e) => {

        const isStartNode = e.target.classList.contains('start');

        const startNode = document.querySelector('.start');
        const endNode = document.querySelector('.end');
        
        const [prevStartParentNodeRow, prevStartParentNodeCol] = startNode.parentElement.id.match(/\d+/g);
        const [prevEndParentNodeRow, prevEndParentNodeCol] = endNode.parentElement.id.match(/\d+/g);

        if(isStartNode) {
            setDraggedItem('start');

            //Sets the data for the drag object to be retrieved later and
            //used to update the corresponding node in the matrix;
            e.dataTransfer.setData('prevNodeId', `node-${prevStartParentNodeRow}-${prevStartParentNodeCol}`);

        } else {
            setDraggedItem('end');
            e.dataTransfer.setData('prevNodeId', `node-${prevEndParentNodeRow}-${prevEndParentNodeCol}`)
        }
    };



    const handleDragEnter = e => {
        const startNode = document.querySelector('.start');
        const endNode = document.querySelector('.end');

        //This check avoids the 'start' and 'end' divs and 
        //*always* selects the parent cell;
        const newParent = e.target.id ? e.target : e.target.parentElement.id ? e.target.parentElement : e.target.parentElement.parentElement;
        const hoveringOver = newParent.id;

        //Retrieves the data set in 'handleDragStart' from the drag object to use as keys
        //to update the previous 'start' node in the grid;
        const [prevNodeRow, prevNodeCol] = e.dataTransfer.getData('prevNodeId').match(/\d+/g);

        //Gets the id of the cell we're currently hovering over to update
        //the new 'start' node in the grid;
        const [newRow, newCol] = hoveringOver.match(/\d+/g);

        console.log(newRow, newCol)

        if(draggedItem === 'start') {

            //All this methods work as intended,
            //the previous 'start' node gets updated alongside the new one
            //in the nodesMatrix;
            newParent.appendChild(startNode);            
            nodeMatrix[prevNodeRow][prevNodeCol].isStart = false;
            nodeMatrix[newRow][newCol].isStart = true;

            //↓ If uncommented, this throws the following error
            //↓ as soon as we drag the start node:
            //(DOMException: Node.removeChild: The node to be removed is not a child of this node);

            /*
            setStartNodeRow(parseInt(newRow));
            setStartNodeCol(parseInt(newCol));
            */

        };
        
        if(draggedItem === 'end') {
            newParent.appendChild(endNode);
            nodeMatrix[prevNodeRow][prevNodeCol].isEnd = false;
            nodeMatrix[newRow][newCol].isEnd = true;

            /*
            setEndNodeRow(parseInt(newRow));
            setEndNodeCol(parseInt(newCol));
            */
        };
};

    return (
        <div id={`node-${ row }-${ col }`} onDragEnter={handleDragEnter} className={`node relative flex place-items-center place-content-center w-8 h-8 border border-black`}>
            { isStart && 
            <div onDragStart={handleDragStart} draggable={true} className="start cursor-grab bg-green-500 w-full h-full flex place-content-center">
            <i className="border-r-8 border-t-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
            </div>
            }
            { isEnd && 
            <div onDragStart={handleDragStart} draggable={true} className="end relative z-1 cursor-grab bg-red-500 w-full h-full flex place-content-center" >
            <i className="border-l-8 border-b-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
            </div>
            }
        </div>
    )
}

export default Node