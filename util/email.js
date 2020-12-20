const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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'
sgMail.setApiKey(sendgridAPIKey)


const sendWelcomEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'naumananwarpsf@gmail.com',
        subject: 'Signup succeeded!',
        text: `${name} successfully signed up`
    });
};

module.exports = {

    sendWelcomEmail
}