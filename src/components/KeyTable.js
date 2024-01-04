import KeyRow from "./KeyRow";
import "../styles/KeyTable.css"

export default function KeyTable({ values, handleKeyDown }) {
    const keyEntries = Object.entries(values)
    
    const keyRow1 = keyEntries.slice(0, 10)
    const keyRow2 = keyEntries.slice(10, 19)

    const keyRow3 = keyEntries.slice(19)
    const keyRow3New = [["Enter", ""], ...keyRow3, ["Bksp", ""]]

    return (
        <div className="key-table">
            <KeyRow values={keyRow1} rowNum={"1"} handleKeyDown={handleKeyDown}/>
            <KeyRow values={keyRow2} rowNum={"2"} handleKeyDown={handleKeyDown}/>
            <KeyRow values={keyRow3New} rowNum={"3"} handleKeyDown={handleKeyDown}/>
        </div>
    )
}