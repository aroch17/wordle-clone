import '../styles/Word.css'

export default function Word({ number }) {
    function handleKeyPress(e) {
        if (e.code == "Backspace") {
            const { value, name } = e.target
            const charNumStr = name.split("-")[3]
            
            if (value.length == 0) {
                const charNum = parseInt(charNumStr, 10)
                if (charNum > 1) {
                    const previousSibling = document.querySelector(
                        `input[name=row-${number}-char-${charNum - 1}]`
                    );
                    previousSibling.focus()
                }
            }
        }
    }

    function handleChange(e) {
        const maxLength = 1
        const { value, name } = e.target
        const charNumStr = name.split("-")[3]

        if (value.length >= maxLength) {
            const charNum = parseInt(charNumStr, 10)
            if (charNum < 5) {
                const nextSibling = document.querySelector(
                    `input[name=row-${number}-char-${charNum + 1}]`
                );
                nextSibling.focus()
            }
        }
    }

    return (
        <>
            <form action="">
                <div className="char-input-row">
                    <input name={"row-" + number + "-char-1"} className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <input name={"row-" + number + "-char-2"} className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <input name={"row-" + number + "-char-3"} className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <input name={"row-" + number + "-char-4"} className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <input name={"row-" + number + "-char-5"} className="char-input" type="text" maxLength={1} onChange={handleChange} onKeyDown={handleKeyPress} />
                </div>
            </form>
        </>
    )
}