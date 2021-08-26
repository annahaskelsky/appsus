export function LongTxt({ text }) {

    return <p>{text.substring(0, 50) + '...'}</p>
}