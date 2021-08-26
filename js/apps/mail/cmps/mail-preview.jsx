const { Link } = ReactRouterDOM

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

export function MailPreview({ mail, getUrlParam }) {

    return (
        <Link to={`/mail/${getUrlParam()}/${mail.id}`} className={"flex mail-preview " + (!mail.isRead ? 'read' : '' )}>
            <p>{(mail.nickname) && mail.nickname || mail.from}</p>
            {mail.subject && <LongTxt text={mail.subject} />}
            {mail.body && <LongTxt text={mail.body} />}
            {!mail.body && <p>No content</p>}
            <p>{getTimeStr(mail.sentAt)}</p>
        </Link>
    )
}