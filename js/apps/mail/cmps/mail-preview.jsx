const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';

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

export function MailPreview({ mail, getUrlParam, onToggleStar, onDeleteMail, onToggleReadStatus }) {
    const namePreviewStyle = { backgroundColor: mail.color }
    const urlParam = getUrlParam();
    return (<section className="mail-preview flex align-center">
        <button onClick={() => onToggleStar(mail.id)}>
            {(mail.isStarred) ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
        </button>
        <Link to={mail.isDraft ? `/mail/edit/${mail.id}` : `/mail/${urlParam}/${mail.id}`} className={"flex  " + (!mail.isRead ? 'read' : '')}>
            <div className="name-preview-i" style={namePreviewStyle}>
                {mail.nickname && mail.nickname.charAt(0).toUpperCase() ||
                mail.from.charAt(0).toUpperCase()}
            </div>
            <div className="flex info-preview">

                {(urlParam === 'sent' || urlParam === 'draft') && <p className="name-preview">{(mail.nickname) && mail.nickname || mail.to}</p>}
                {(urlParam !== 'sent' && urlParam !== 'draft') && <p className="name-preview">{(mail.nickname) && mail.nickname || mail.from}</p>}
                <p>{mail.subject} -</p>
                <div className="mail-body-preview">
                    {mail.body && <LongTxt text={mail.body} />}
                </div>
                {/* {!mail.body && <p>No content</p>} */}
            </div>
            <p className="date-preview">{getTimeStr(mail.sentAt)}</p>

        </Link>
        <section className="buttons-hover">
            <button onClick={() => onDeleteMail(mail.id)}><i className="fa fa-trash" aria-hidden="true" title="Delete"></i></button>
            <button onClick={() => onToggleReadStatus(mail.id)}>{mail.isRead ?
                <i className="fas fa-envelope" title="Mark as unread"></i> :
                <i className="fas fa-envelope-open-text" title="Mark as read"></i>}
            </button>
        </section>
    </section >
    )
}

