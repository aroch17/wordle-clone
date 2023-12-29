import "../styles/WordAtom.css"

export default function WordAtom({ Ref, isDisabled, value, handleKeyDown }) {
    return (
        <input
            type="text"
            ref={Ref}
            className="char-input"
            maxLength={1} value={value}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            readOnly
            autoFocus
        />
    )
}