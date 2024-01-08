import "../styles/modals/modals.css"

export default function Modal({ isModalVisible, message, CORRECT_WORD }) {
    let modalMessage = ""
    switch (message) {
        case "INVALID":
            modalMessage = "Invalid word"
            break
        case "INCOMPLETE":
            modalMessage = "Not enough letters"
            break
        case "FAIL":
            modalMessage = CORRECT_WORD
            break
        default:
            break
    }

    return (
        <p style={{opacity: isModalVisible ? "1" : "0"}} className="modal">{modalMessage}</p>
    )
}