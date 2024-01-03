import "../styles/Key.css"

export default function Key({ value, backColor }) {
    return (
        <div
            className={"key " + ((value == "Enter" || value == "Bksp") ? "special" : "") + ((backColor) ? backColor : "")}
        >
            <p className="key-val">{value}</p>
        </div>
    )
}