import { LongTxt } from '../../../cmps/long-text.jsx'

function getTimeStr(time) {
    const now = Date.now();
    const diff = now - time;

    if (diff < 1000 * 60 * 60 * 24) return 'Today';
    if (diff < 1000 * 60 * 60 * 24 * 2) return 'Yesterday';

    const date = new Date(time);
    return date.toLocaleString()
}

export function MailPreview({ mail }) {

    return (
        <section className="flex mail-preview">
            <p>{mail.from}</p>
            <p>{mail.subject}-</p>
            <LongTxt text={mail.body} />
            <p>{getTimeStr(mail.sentAt)}</p>
        </section>
    )
}