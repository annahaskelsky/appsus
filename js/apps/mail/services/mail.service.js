import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    getUser,
    mailsToShow,
    getMailById,
    markMailAsRead,
    deleteMail,
    sendMail
}


const loggedinUser = { email: 'Muki@appsus.com', fullname: 'Muki Appsus' }
let gMails;

_createMails();

function getUser() {
    return Promise.resolve(loggedinUser);
}

function query() {
    return Promise.resolve(gMails);
}

function mailsToShow(user, criteria, filterBy) {
    let mails = _getMailsByStatus(user, criteria);
    if (filterBy) mails = _getMailsByFilter(mails, filterBy)
    if (mails.length > 1) mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt);
    return Promise.resolve(mails);
}

function _getMailsByStatus(user, criteria) {
    let mails = gMails.filter(mail => {
        switch (criteria.status) {
            case 'sent':
                return mail.from === user.email;
            case 'trash':
                return mail.isTrash;
            case 'draft':
                return mail.isDraft;
            case 'inbox':
                return mail.to === user.email && !mail.isTrash;
        }
    });
    // mails = mails.filter(mail => {
    //     return (criteria.isStared && mail.isStared) || (!criteria.isStared && mail)
    // })
    return mails;
}

function _getMailsByFilter(mails, filterBy) {
    let { txt, readStatus } = filterBy;
    const filteredMails = mails.filter(mail => {
        return (mail.body.includes(txt) || mail.subject.includes(txt) || mail.to.includes(txt)) &&
            ((readStatus === 'read') ? mail.isRead : ((readStatus === 'unread') ? !mail.isRead : true))
    });
    return filteredMails;
}

function getMailById(mailId) {
    const mail = gMails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)

}

function getMailIndex(mailId) {
    return gMails.findIndex(mail => mail.id === mailId);
}

function markMailAsRead(mailId) {
    const mailIdx = getMailIndex(mailId)
    if (!mailIdx || !gMails[mailIdx]) return;
    gMails[mailIdx].isRead = true;
    _saveMailsToStorage();
}


function sendMail(mialInfo) {
    const mail = {
        id: utilService.makeId(),
        subject: (mialInfo.subject) ? mialInfo.subject : 'No subject',
        body: (mialInfo.body) ? mialInfo.body : 'No content',
        isRead: true,
        sentAt: Date.now(),
        to: mialInfo.to,
        from: loggedinUser.email,
        isTrash: false,
        isStared: false,
        isDraft: false
    }

    gMails.unshift(mail);
    _saveMailsToStorage();
}

function deleteMail(mailId) {
    const mailIdx = getMailIndex(mailId);
    console.log(mailIdx)
    if (!gMails[mailIdx]) return;
    if (gMails[mailIdx].isTrash) {
        gMails.splice(mailIdx, 1);
        _saveMailsToStorage();
        return;
    }
    _moveMailToTrash(mailIdx);
}

function _moveMailToTrash(mailIdx) {
    console.log(mailIdx)
    gMails[mailIdx].isTrash = true;
    _saveMailsToStorage();
}


function _createMails() {
    let mails = storageService.loadFromStorage('mailsDB');
    if (!mails || !mails.length) {
        mails = [{
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Hey, buddy! I miss you so much! I hope you have fun in the course you\'re taking. ' +
                    'I hope you\'ll finish top of the class and find the best job after it! Please call me tommorow and let me know how it goes',
                isRead: true,
                sentAt: 1551133930594,
                to: 'Muki@appsus.com',
                from: 'shula@appsus.com',
                nickname: 'Mom',
                isTrash: false,
                isStared: true,
                isDraft: false
            }, {
                id: utilService.makeId(),
                subject: '[GitHub] A first-party application has been added to your account',
                body: 'Hey Muki!\n\nA first- party GitHub OAuth application(Git Credential Manager) with gist, repo, and workflow' +
                    'scopes was recently authorized to access your account. Visit https://github.com/settings/connections/applications for more information.\n' +
                    'To see this and other security events for your account, visit https://github.com/settings/security-log\n' +
                    'If you run into problems, please contact support by visiting https://github.com/contact\n\n' +
                    'Thanks,\n The GitHub Team',
                isRead: false,
                sentAt: Date.now(),
                to: 'Muki@appsus.com',
                nickname: 'GitHub',
                from: 'noreply@github.com',
                isTrash: false,
                isStared: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: 'I Miss you Too!',
                body: 'Hey, mom. I miss you too! It\'s going great! tty soon!♥',

                isRead: true,
                sentAt: Date.now(),
                nickname: 'Mom',
                to: 'shula@appsus.com',
                from: 'Muki@appsus.com',
                isTrash: false,
                isStared: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: 'Verify your new Amazon account',
                body: 'To verify your email address, please use the following One Time Password (OTP):\n #####\n' +
                    'Do not share this OTP with anyone. Amazon takes your account security very seriously.' +
                    ' Amazon Customer Service will never ask you to disclose or verify your Amazon password, OTP, credit card,' +
                    ' or banking account number. If you receive a suspicious email with a link to update your account information,' +
                    ' do not click on the link—instead, report the email to Amazon for investigation.\n' +
                    'Thank you!',
                isRead: false,
                sentAt: Date.now() - 1000 * 60 * 60 * 24,
                to: 'Muki@appsus.com',
                nickname: 'Amazon',
                from: 'auto-confirm@amazon.com',
                isTrash: false,
                isStared: false,
                isDraft: false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
                    'Ratione similique consequatur harum odit, eos hic nostrum excepturi distinctio' +
                    'tempore earum qui quam vel omnis odio veniam alias dignissimos rerum deserunt?',
                isRead: true,
                sentAt: 1151133934594,
                to: 'Muki@appsus.com',
                from: 'lala@apssus.com',
                isTrash: false,
                isStared: false,
                isDraft: false
            }
        ]
    }
    gMails = mails;
    _saveMailsToStorage();
}

function _saveMailsToStorage() {
    storageService.saveToStorage('mailsDB', gMails);
}