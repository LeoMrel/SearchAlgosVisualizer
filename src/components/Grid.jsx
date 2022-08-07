import React, { useState } from 'react';
import { useEffect } from 'react';
import { getNodesInShortestPathOrder } from '../algorithms/auxFunctions';
import { dijkstra } from '../algorithms/dijkstra';
import Node from './Node';


const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 13;
const FINISH_NODE_COL = 28;

const Grid = () => {

    const [nodes, setNodes] = useState([]);
    
    const COLUMNS = 30;
    const ROWS = 20;

    useEffect(() => {
        const cells = [];

        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLUMNS; col++) {
                currentRow.push({
                    row,
                    col,
                    isStart: row === START_NODE_ROW && col === START_NODE_COL,
                    isEnd: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                    distance: Infinity,
                    visited: false,
                    previousNode: null
                });
            };
            cells.push(currentRow);
        };

        return () => setNodes(cells);
    }, [])


    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited')
          }, 10 * i);
        }
};

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-shortest-path') 
          }, 50 * i);
        }
};


      
    const visualizeDijkstra = (nodeMatrix) => {
        const startNode = nodeMatrix[START_NODE_ROW][START_NODE_ROW];
        const endNode = nodeMatrix[FINISH_NODE_ROW][FINISH_NODE_COL];
        
        const visitedNodesInOrder = dijkstra(nodeMatrix, startNode, endNode);
        const shortestPath = getNodesInShortestPathOrder(endNode);

        animateDijkstra(visitedNodesInOrder, shortestPath);
}; 


    return (
        <div className="border border-red-400 border-solid flex gap-0.5 self-center">
            {nodes.map((row, rowIndex) => {
                return(
                    <div key={rowIndex} className='flex flex-col gap-0.5'>
                    {row.map((node, index) => {
                        const { row, col, isStart, isEnd } = node;

                        return <Node key={index} props={{row, col, isStart, isEnd}} />
                        })}
                    </div>
                )
            })
            }
    
    <button onClick={() => visualizeDijkstra(nodes)}>Search Path</button>
        </div>
    )

}

export default Grid