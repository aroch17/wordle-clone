import WordAtom from "./WordAtom"
import { MAX_NUMBER_OF_CHARS } from "./WordTableNew"
import "../styles/WordNew.css"

export default function WordNew({ innerRef, isDisabled, letters, handleKeyDown, backgroundColors }) {
    const columns = [
        <WordAtom
            key={0}
            innerRef={innerRef}
            isDisabled={isDisabled}
            value={letters[0]}
            backgroundColor={backgroundColors[0]}
            handleKeyDown={handleKeyDown}
        />
    ]
    for (let i = 1; i < MAX_NUMBER_OF_CHARS; i++) {
        columns.push(
            <WordAtom
                key={i}
                isDisabled={true}
                value={letters[i]}
                backgroundColor={backgroundColors[i]}
                handleKeyDown={handleKeyDown}
            />
        )
    }
    return (
        <div className="word">
            {columns}
        </div>
    )
}