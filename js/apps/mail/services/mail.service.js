import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    getUser,
    mailsToShow

}

const loggedinUser = { email: 'Muki@appsus.com', fullname: 'Muki Appsus' }

const gMails = [{
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        to: 'Muki@appsus.com',
        from: 'momo@momo.com',
        isTrash: false,
        isStared: true,
        isDraft: false
    }, {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: '',
        isRead: false,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        from: 'Muki@appsus.com',
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
        isRead: false,
        sentAt: Date.now(),
        to: 'Muki@appsus.com',
        from: 'lala@apssus.com',
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
        sentAt: Date.now() - 1000 * 60 * 60 * 24,
        to: 'Muki@appsus.com',
        from: 'lala@apssus.com',
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

function getUser() {
    return Promise.resolve(loggedinUser);
}

function mailsToShow(user, criteria) {
    console.log(criteria)
        // let mail = gMails.filter(mail => {
        //     return (criteria.status && mail.from === user.email)
        //         || (criteria.trash && mail.isTrash)
        //         || (criteria.)
        // })

    let mails = filterBy(user, criteria);

    if (mails.length > 1) mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt);
    return Promise.resolve(mails);
}

function filterBy(user, criteria) {
    let mails = gMails.filter(mail => {
        switch (criteria.status) {
            case 'sent':
                return mail.from === user.email;
            case 'trash':
                return mail.isTrash;
            case 'draft':
                return mail.isDraft;
            default:
                return true;
        }
    });
    mails = mails.filter(mail => {
        return (criteria.isStared && mail.isStared) || (!criteria.isStared && mail)
    })

    return mails;
}