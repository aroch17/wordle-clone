import { useState, useRef } from "react";
import WordNew from "./WordNew";
import { MAX_NUMBER_OF_TRIES, MAX_NUMBER_OF_CHARS } from "./Word";

export default function WordTableNew() {
    const [currentRow, setCurrentRow] = useState(0)
    const [currentLetter, setCurrentLetter] = useState(0)

    const inputRef = useRef(null)

    // letters -> 2D array
    const [letters, setLetters] = useState(Array(MAX_NUMBER_OF_TRIES).fill(0).map(() => new Array(MAX_NUMBER_OF_CHARS).fill("")))

    function handleKeyDown(e) {
        const key = e.key

        if (key === "Backspace") {
            const nextLetterRow = letters[currentRow].map((letter, index) => {
                if (index === currentLetter - 1) {
                    setCurrentLetter(currentLetter - 1)
                    return ""
                }
                else { return letter }
            });

            const nextLetters = letters.map((letterRow, index) => {
                if (index == currentRow) {
                    return nextLetterRow
                }
                else { return letterRow }
            })
            setLetters(nextLetters);
        }

        if (key === "Enter") {
            const guessed_word = letters[currentRow].join("")
            if (guessed_word.length < 5) { console.log("Not enough letters") }

            else {
                setCurrentRow(currentRow + 1)
                setCurrentLetter(0)
                setTimeout(() => {
                    if (inputRef.current) { inputRef.current.focus() }
                }, 1)
            }
        }

        // only characters allowed
        const value = key.replace(/[^A-Za-z]/ig, '')
        if (value && value.length === 1) {
            // update row
            const nextLetterRow = letters[currentRow].map((letter, index) => {
                if (index === currentLetter) {
                    setCurrentLetter(currentLetter + 1)
                    return value.toUpperCase()
                }
                else { return letter }
            });

            // update 2D array
            const nextLetters = letters.map((letterRow, index) => {
                if (index === currentRow) {
                    return nextLetterRow
                }
                else { return letterRow }
            })
            setLetters(nextLetters);
        }
    }

    const rows = []
    for (let i = 0; i < MAX_NUMBER_OF_TRIES; i++) {
        // if current row !== i -> disable
        rows.push(
            <WordNew
                key={i}
                Ref={i === currentRow ? inputRef : null}
                isDisabled={i !== currentRow}
                letters={letters[i]}
                handleKeyDown={handleKeyDown}
            />
        )
    }
    return (rows)
}