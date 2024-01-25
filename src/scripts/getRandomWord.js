const API_URL = "https://random-word-api.herokuapp.com/word?length=5"

export async function getRandomWord() {
    const res = await fetch(`${API_URL}`)
    const data = await res.json()
    const word = data[0]
    return word.toUpperCase()
}