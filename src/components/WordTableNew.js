import { useState, useRef } from "react";
import WordNew from "./WordNew";
import { isWordInDict } from "../scripts/dictionaryChecker";
import KeyTable from "./KeyTable";

export const MAX_NUMBER_OF_TRIES = 6
export const MAX_NUMBER_OF_CHARS = 5

const KEYS = {
    "Q": "",
    "W": "",
    "E": "",
    "R": "",
    "T": "",
    "Y": "",
    "U": "",
    "I": "",
    "O": "",
    "P": "",
    "A": "",
    "S": "",
    "D": "",
    "F": "",
    "G": "",
    "H": "",
    "J": "",
    "K": "",
    "L": "",
    "Z": "",
    "X": "",
    "C": "",
    "V": "",
    "B": "",
    "N": "",
    "M": "",
}

const CORRECT_WORD = "TWIRL"
const CORRECT_LETTER_POSITION_CLASS = "green"
const CORRECT_LETTER_CLASS = "yellow"

export default function WordTableNew() {
    const [currentRow, setCurrentRow] = useState(0)
    const [currentLetter, setCurrentLetter] = useState(0)

    // letters, backgroundColors -> 2D array
    const [letters, setLetters] = useState(Array(MAX_NUMBER_OF_TRIES).fill(0).map(() => new Array(MAX_NUMBER_OF_CHARS).fill("")))
    const [backgroundColors, setBackgroudColors] = useState(Array(MAX_NUMBER_OF_TRIES).fill(0).map(() => new Array(MAX_NUMBER_OF_CHARS).fill("")))

    const [keys, setKeys] = useState(KEYS)
    const nextKeys = {...keys}
    const inputLetters = {}

    // to focus on next row
    const inputRef = useRef(null)

    function checkCharMembership(letter, word) {
        for (let ch of word) {
            if (ch === letter) { return true }
        }
        return false
    }

    async function handleKeyDown(e) {
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
                for (let letter of guessed_word) {
                    inputLetters[letter] = "green"
                }

                Object.keys(nextKeys).map((key) => {
                    if (Object.hasOwn(inputLetters, key)) {
                        nextKeys[key] = inputLetters[key]
                    }
                })
                setKeys(nextKeys)

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
                const wordInDict = await isWordInDict(guessed_word)
                if (!wordInDict) { console.log("Invalid word") }
                else {

                    // deep copy
                    const guess_letters = [...letters[currentRow]]
                    const correct_letters = CORRECT_WORD.split("")
                    const correct_positions = []
                    const correct_letters_wrong_positions = []
                    

                    for (let i = 0; i < MAX_NUMBER_OF_CHARS; i++) {
                        if (guess_letters[i] === correct_letters[i]) {
                            correct_positions.push(i)
                            inputLetters[guess_letters[i]] = "green"
                            guess_letters[i] = ""
                            correct_letters[i] = ""
                        }
                    }

                    for (let i = 0; i < MAX_NUMBER_OF_CHARS; i++) {
                        const ch = guess_letters[i]
                        if (ch) {
                            if (checkCharMembership(ch, correct_letters)) {
                                correct_letters_wrong_positions.push(i)
                                inputLetters[ch] = "yellow"
                                guess_letters[i] = ""
                                const index = correct_letters.indexOf(ch)
                                correct_letters[index] = ""
                            }
                        }
                    }

                    for (let ch of guess_letters) {
                        if(ch) {
                            inputLetters[ch] = "grey"
                        }
                    }

                    Object.keys(nextKeys).map((key) => {
                        if (Object.hasOwn(inputLetters, key)) {
                            nextKeys[key] = inputLetters[key]
                        }
                    })
                    setKeys(nextKeys)

                    const nextBackgroundColorsRow = backgroundColors[currentRow].map((color, index) => {
                        if (correct_positions.includes(index)) {
                            return `${CORRECT_LETTER_POSITION_CLASS}`
                        }
                        else if (correct_letters_wrong_positions.includes(index)) {
                            return `${CORRECT_LETTER_CLASS}`
                        }
                        else { return color }
                    })

                    const nextBackgroundColors = backgroundColors.map((colorRow, index) => {
                        if (index === currentRow) {
                            return nextBackgroundColorsRow
                        }
                        else { return colorRow }
                    })
                    setBackgroudColors(nextBackgroundColors)

                    setCurrentRow(currentRow + 1)
                    setCurrentLetter(0)
                    setTimeout(() => {
                        if (inputRef.current) { inputRef.current.focus() }
                    }, 1)
                }
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
    return (
        <>
            {rows}
            <KeyTable values={keys} />
        </>
    )
}