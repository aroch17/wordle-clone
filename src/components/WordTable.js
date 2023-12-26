import { useState } from "react"
import Word from "./Word"

export default function WordTable() {
    const [currentRow, setCurrentRow] = useState(1)

    function handleKeyDown(e) {
        // TODO: Only disable row if every input filled
        if (e.code == "Enter") {
            setCurrentRow(currentRow + 1)
        }
    }

    return (
        <>
            <div className="row-1" style={currentRow != 1 ? { pointerEvents: "none" } : {}} onKeyDown={handleKeyDown}>
                <Word number={1}/>
            </div>
            <div className="row-2" style={currentRow != 2 ? { pointerEvents: "none" } : {}} onKeyDown={handleKeyDown}>
                <Word number={2}/>
            </div>
            <div className="row-3" style={currentRow != 3 ? { pointerEvents: "none" } : {}} onKeyDown={handleKeyDown}>
                <Word number={3}/>
            </div>
            <div className="row-4" style={currentRow != 4 ? { pointerEvents: "none" } : {}} onKeyDown={handleKeyDown}>
                <Word number={4}/>
            </div>
            <div className="row-5" style={currentRow != 5 ? { pointerEvents: "none" } : {}} onKeyDown={handleKeyDown}>
                <Word number={5}/>
            </div>

        </>
    )
}