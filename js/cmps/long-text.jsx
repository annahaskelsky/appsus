export function LongTxt({ text }) {

    return <p>{text.substring(0, 30) + '...'}</p>
}