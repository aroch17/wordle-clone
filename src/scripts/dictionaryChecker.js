const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en"

export async function isWordInDict(word) {
    const res = await fetch(`${API_URL}/${word}`)
    if (res.status == "404") {
        return false
    }
    return true
}