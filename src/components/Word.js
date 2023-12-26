import '../styles/Word.css'

export default function Word({ isDisabled }) {
    function handleKeyPress(e) {
        if (e.code == "Backspace") {
            const { value, name } = e.target
            const charNumStr = name.split("-")[1]
            
            if (value.length == 0) {
                const charNum = parseInt(charNumStr, 10)
                if (charNum > 1) {
                    const previousSibling = document.querySelector(
                        `input[name=char-${charNum - 1}]`
                    );
                    console.log(previousSibling)
                    previousSibling.focus()
                }
            }
        }
    }

    function handleChange(e) {
        const maxLength = 1
        const { value, name } = e.target
        const charNumStr = name.split("-")[1]

        if (value.length >= maxLength) {
            const charNum = parseInt(charNumStr, 10)
            if (charNum < 5) {
                const nextSibling = document.querySelector(
                    `input[name=char-${charNum + 1}]`
                );
                nextSibling.focus()
            }
        }
    }

    return (
        <>
            <form action="">
                <div className="char-input-row" style={isDisabled ? {pointerEvents: "none"} : {}}>
                    <input name="char-1" className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <input name="char-2" className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <input name="char-3" className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <input name="char-4" className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <input name="char-5" className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                </div>
            </form>
        </>
    )
}