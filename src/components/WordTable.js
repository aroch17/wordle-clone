import { useState } from "react"
import Word, { MAX_NUMBER_OF_TRIES } from "./Word"

export default function WordTable() {
    const [currentRow, setCurrentRow] = useState(1)

    function handleKeyDown(e) {
        // TODO: Only disable row if every input filled
        if (e.code === "Enter") {
            setCurrentRow(currentRow + 1)
            if (currentRow < MAX_NUMBER_OF_TRIES) {
                const nextBlock = document.querySelector(`input[name=row-${currentRow + 1}-char-1]`)
                nextBlock.focus()
            }
            // TODO: after last try, focus on leader board button
        }
    }

    function WordBlock (number) {
        return (
            <div key={"row-" + number} className={"row-" + number} style={currentRow !== number ? { pointerEvents: "none" } : {}} onKeyDown={handleKeyDown}>
                <Word number={number} />
            </div>
        )
    }

    const rows = []
    for (let i = 1; i <= MAX_NUMBER_OF_TRIES; i++) {
        rows.push(WordBlock(i))
    }
    
    return (rows)
}