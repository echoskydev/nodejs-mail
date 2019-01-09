const mailserver = require('../../configs/mailserver');

class MailserversComponent {

    sendEmail(data) {
        const mailOptions = {
            from: `Cloud Social WiFi+ <info@seed-soft.com>`,
            to: `${data.email}`,
        };

        const template = `template/`;

        return new Promise((resolve, reject) => {
            // resolve(data);
            switch (data.action) {
                case 'recoverypassword':
                    mailOptions.subject = `Password Reset`;
                    mailOptions.html = "<b>Mail reset password</b>";
                    break;

                case 'welcome':
                    mailOptions.subject = `Welcome to Cloud Social WiFi+`;
                    mailOptions.html = "<b>Welcome to Cloud Social WiFi+</b>";
                    break;

                default:
                    mailOptions.subject = `Cloud Social WiFi+`;
                    mailOptions.html = ``;
                    break;
            }


            mailserver.sendMail(mailOptions, (err, res) => {
                res ? resolve(res) : reject(err);
            });
        });
    }
}

module.exports = MailserversComponent;