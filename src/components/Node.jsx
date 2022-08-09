const Node = ({ grid, pointer, stateHandling, dragStateHandling, row, col, isStart, isEnd }) => {

    const { nodes, setNodes} = grid;
    const { startNodeRow, startNodeCol, endNodeRow, endNodeCol } = pointer;
    const { setStartNodeRow, setStartNodeCol, setEndNodeRow, setEndNodeCol } = stateHandling;
    const { draggedItem, setDraggedItem } = dragStateHandling;



    const handleDragStart = (e) => {

        const node = e.target;
        const isStartNode = node.classList.contains('start');

        const startNode = document.querySelector('.start');
        //const endNode = document.querySelector('.end');
        
        const [prevStartParentNodeRow, prevStartParentNodeCol] = startNode.parentElement.id.match(/\d+/g);
        //const [prevEndParentNodeRow, prevEndParentNodeCol] = endNode.parentElement.id.match(/\d+/g);

        if(isStartNode) {
            setDraggedItem('start');
            e.dataTransfer.setData('prevNodeId', `node-${prevStartParentNodeRow}-${prevStartParentNodeCol}`);
        } else {
            setDraggedItem('end');
            //e.dataTransfer.setData('prevNodeId', `node-${prevEndParentNodeRow}-${prevEndParentNodeCol}`)
        }
    };



    const handleDragEnter = e => {
        
        const startNode = document.querySelector('.start');
        const endNode = document.querySelector('.end');

        //This check helps to avoid 
        const newParent = e.target.id ? e.target : e.target.parentElement.id ? e.target.parentElement : e.target.parentElement.parentElement;
        const hoveringOver = newParent.id;
        
        const [prevNodeRow, prevNodeCol] = e.dataTransfer.getData('prevNodeId').match(/\d+/g);
        const [newRow, newCol] = hoveringOver.match(/\d+/g);

        console.log(newParent);

        if(draggedItem === 'start') {
            newParent.appendChild(startNode);
            
            nodes[prevNodeRow][prevNodeCol].isStart = false;
            nodes[newRow][newCol].isStart = true;

            /*setStartNodeRow(parseInt(newRow));
            setStartNodeCol(parseInt(newCol));   */
        };
        
        if(draggedItem === 'end') {
            //newParent.appendChild(endNode);
            
            /*nodes[prevNodeRow][prevNodeCol].isEnd = false;
            nodes[newRow][newCol].isEnd = true;
            setEndNodeRow(parseInt(newRow));
            setEndNodeCol(parseInt(newCol));*/
        };
};

    return (
        <div id={`node-${ row }-${ col }`} onDragEnter={handleDragEnter} className={`node relative flex place-items-center place-content-center w-12 h-12 border border-black`}>
            { isStart && 
            <div onDragStart={handleDragStart} draggable={true} className="start cursor-grab bg-green-500 w-full h-full flex place-content-center">
            <i className="border-r-8 border-t-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
            </div>}
            { isEnd && 
            <div onDragStart={handleDragStart} draggable={true} className="end relative z-1 cursor-grab bg-red-500 w-full h-full flex place-content-center" >
            <i className="border-l-8 border-b-8 border-gray-800 rotate-45 h-4 w-4 place-self-center" />
            </div>
            }
        </div>
    )
}

export default Node