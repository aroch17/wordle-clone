import Key from "./Key"
import "../styles/KeyRow.css"

export default function KeyRow({ values, rowNum, handleKeyDown, innerRef }) {
    const keys = []
    for (let value of values) {
        keys.push(<Key key={value[0]} value={value[0]} backColor={value[1]} handleKeyDown={handleKeyDown} innerRef={innerRef}/>)
    }
    return (
        <div className={`row-${rowNum}`}>
            {keys}
        </div>
    )
}