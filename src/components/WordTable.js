import { useState } from "react"
import { MAX_NUMBER_OF_TRIES, MAX_NUMBER_OF_CHARS } from "./Word"
import WordBlock from "./WordBlock"

export default function WordTable() {
    const [currentRow, setCurrentRow] = useState(1)

    function checkRowComplete(rowNum) {
        const row = document.querySelector(`.row-${rowNum}`).childNodes[0]
        for (let i = 0; i < MAX_NUMBER_OF_CHARS; i++) {
            const ch = row.childNodes[i].value
            if (!ch) return false
        }
        return true
    }

    function moveNextRow() {
        setCurrentRow(currentRow + 1)
        if (currentRow < MAX_NUMBER_OF_TRIES) {
            const nextBlock = document.querySelector(`input[name=row-${currentRow + 1}-char-1]`)
            nextBlock.focus()
        }
    }

    function handleKeyDown(e) {
        if (e.code === "Enter") {
            const { name } = e.target
            const rowNum = name.split("-")[1]
            if (checkRowComplete(rowNum)) {
                moveNextRow()
            }
            else {
                console.log("Not enough letters")
            }
            // TODO: after last try, focus on leader board button
        }
    }

    const rows = []
    for (let i = 1; i <= MAX_NUMBER_OF_TRIES; i++) {
        rows.push(<WordBlock key={"row-" + i} number={i} currentRow={currentRow} handleKeyDown={handleKeyDown} />)
    }

    return (rows)
}