import "../styles/WordAtom.css"

export default function WordAtom({ innerRef, isDisabled, value, handleKeyDown, backgroundColor }) {
    return (
        <input
            type="text"
            ref={innerRef}
            className={`char-input ${backgroundColor}`}
            maxLength={1} 
            value={value}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            readOnly
            autoFocus
        />
    )
}