export const mailService = {
    getUser,
    mailsToShow

}

const loggedinUser = { email: 'user@appsus.com', fullname: 'Muki Appsus' }

const gMails = [{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    to: 'user@appsus.com',
    from: 'momo@momo.com'
},
{
    id: 'e102',
    subject: 'Miss you!',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ratione similique consequatur harum odit, eos hic nostrum excepturi distinctio' +
        'tempore earum qui quam vel omnis odio veniam alias dignissimos rerum deserunt?',
    isRead: true,
    sentAt: Date.now(),
    to: 'momo@momo.com',
    from: 'lala@apssus.com'
},
{
    id: 'e103',
    subject: 'Miss you!',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ratione similique consequatur harum odit, eos hic nostrum excepturi distinctio' +
        'tempore earum qui quam vel omnis odio veniam alias dignissimos rerum deserunt?',
    isRead: true,
    sentAt: Date.now(),
    to: 'momo@momo.com',
    from: 'lala@apssus.com'
},
{
    id: 'e104',
    subject: 'Miss you!',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ratione similique consequatur harum odit, eos hic nostrum excepturi distinctio' +
        'tempore earum qui quam vel omnis odio veniam alias dignissimos rerum deserunt?',
    isRead: true,
    sentAt: Date.now(),
    to: 'momo@momo.com',
    from: 'lala@apssus.com'
}
]

function getUser() {
    return Promise.resolve(loggedinUser);
}

function mailsToShow() {
    if (gMails.length > 1) gMails.sort(function (mail1, mail2) {
        return mail1.sentAt > mail2.sentAt
    })
    return Promise.resolve(gMails);
}
