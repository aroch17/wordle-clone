import WordAtom from "./WordAtom"
import { MAX_NUMBER_OF_CHARS } from "./Word"
import "../styles/WordNew.css"

export default function WordNew({ Ref, isDisabled, letters, handleKeyDown }) {
    const columns = [
        <WordAtom
            key={0}
            Ref={Ref}
            isDisabled={isDisabled}
            value={letters[0]}
            handleKeyDown={handleKeyDown}
        />
    ]
    for (let i = 1; i < MAX_NUMBER_OF_CHARS; i++) {
        columns.push(
            <WordAtom
                key={i}
                isDisabled={true}
                value={letters[i]}
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