
const Node = ({ props }) => {

    const {row, col, isStart, isEnd} = props

   const styles = isStart ? 'bg-green-500' : isEnd ? 'bg-red-600' : 'bg-white'


    return (
        <div id={`node-${row}-${col}`} className={`w-5 h-5 border border-black ${styles}`} />
    )
}

export default Node