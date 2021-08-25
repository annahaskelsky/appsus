import { LongTxt } from '../../../cmps/long-text.jsx'

function getTimeStr(time) {
    const now = Date.now();
    const diff = now - time;

    if (diff < 1000 * 60 * 60 * 24) return 'Today';
    if (diff < 1000 * 60 * 60 * 24 * 2) return 'Yesterday';

    const date = new Date(time);
    const day = date.getDay();
    const month = date.toLocaleString('en', { month: 'short' });
    return month + ' ' + day
}

export function MailPreview({ mail }) {

    return (
        <section className="flex mail-preview">
            <p>{mail.from}</p>
            <p>{mail.subject} -</p>
            {mail.body && <LongTxt text={mail.body} />}
            {!mail.body && <p>No content</p>}
            <p>{getTimeStr(mail.sentAt)}</p>
        </section>
    )
}