import Word from "./Word"

export default function WordBlock({ number, currentRow, handleKeyDown }) {
    return (
        <div className={"row-" + number} style={currentRow !== number ? { pointerEvents: "none" } : {}} onKeyDown={handleKeyDown}>
            <Word number={number} />
        </div>
    )
}