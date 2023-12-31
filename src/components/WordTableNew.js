import { useState, useRef } from "react";
import WordNew from "./WordNew";

export const MAX_NUMBER_OF_TRIES = 6
export const MAX_NUMBER_OF_CHARS = 5

const CORRECT_WORD = "MATCH"
const CORRECT_LETTER_POSITION_CLASS = "green" 
const CORRECT_LETTER_CLASS = "yellow" 

export default function WordTableNew() {
    const [currentRow, setCurrentRow] = useState(0)
    const [currentLetter, setCurrentLetter] = useState(0)

    // letters, backgroundColors -> 2D array
    const [letters, setLetters] = useState(Array(MAX_NUMBER_OF_TRIES).fill(0).map(() => new Array(MAX_NUMBER_OF_CHARS).fill("")))
    const [backgroundColors, setBackgroudColors] = useState(Array(MAX_NUMBER_OF_TRIES).fill(0).map(() => new Array(MAX_NUMBER_OF_CHARS).fill("")))

    // to focus on next row
    const inputRef = useRef(null)

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
                if (index === currentRow) {
                    return nextLetterRow
                }
                else { return letterRow }
            })
            setLetters(nextLetters);
        }

        if (key === "Enter") {
            const guessed_word = letters[currentRow].join("")
            if (guessed_word.length < 5) { console.log("Not enough letters") }
            else if (guessed_word === CORRECT_WORD) {
                const nextBackgroundColorsRow = backgroundColors[currentRow].map(() => {
                    return `${CORRECT_LETTER_POSITION_CLASS}`
                })

                const nextBackgroundColors = backgroundColors.map((colorRow, index) => {
                    if (index === currentRow) {
                        return nextBackgroundColorsRow
                    }
                    else { return colorRow }
                })
                setBackgroudColors(nextBackgroundColors)
                // disable all rows
                setTimeout(() => {
                    setCurrentRow(MAX_NUMBER_OF_TRIES + 1)
                }, 1)
            }
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
                innerRef={i === currentRow ? inputRef : null}
                isDisabled={i !== currentRow}
                letters={letters[i]}
                backgroundColors={backgroundColors[i]}
                handleKeyDown={handleKeyDown}
            />
        )
    }
    return (rows)
}