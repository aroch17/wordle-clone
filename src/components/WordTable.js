import { useState } from "react"
import Word from "./Word"

export default function WordTable() {
    const [disableRow, setDisableRow] = useState(false)
    return (
        <>
            <Word isDisabled={false}/>
            <Word isDisabled={true}/>
            <Word isDisabled={true}/>
            <Word isDisabled={true}/>
            <Word isDisabled={true}/>
        </>
    )
}