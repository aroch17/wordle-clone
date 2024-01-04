import "../styles/Key.css"

export default function Key({ value, backColor, handleKeyDown, innerRef }) {
    function handleClick(e) {
        const key = e.target.textContent
        if (key == "Bksp") { e = {...e, key: "Backspace"} }
        else { e = {...e, key: key} }
        handleKeyDown(e)
        innerRef.current.focus()
    }

    return (
        <div
            className={"key " + ((value === "Enter" || value === "Bksp") ? "special" : "") + ((backColor) ? backColor : "")}
        >
            <button className="key-val" onClick={handleClick}>{value}</button>
        </div>
    )
}