const nodemailer = require('nodemailer');

const appMail = 'no.replay.notes8@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'no.reply.notes8@gmail.com',
        pass: 'notes.send-email'
    }
});

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: appMail,
        to: email,
        subject: 'Welcome to Task Manager',
        html: '<h1>Welcome to the app,' + name + '</h1><p>Let us know how you get along with the app.</p>'
    }, function (error, info) {
        if (error)
            return console.log(error);

        console.log('Email sent: ' + info.response);
    });
};

const sendCancelationEmail = (email, name) => {
    transporter.sendMail({
        from: appMail,
        to: email,
        subject: 'Sorry to see you go',
        html: '<h1>Goodbye ' + name + '</h1></br><p>We hope to see you back sometime soon</p>'
    }, function (error, info) {
        if (error)
            return console.log(error);

        console.log('Email sent: ' + info.response);
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};