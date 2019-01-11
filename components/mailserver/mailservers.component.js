const mailserver = require('../../configs/mailserver');
const fs = require("fs");
const _ = require('lodash');

class MailserversComponent {
    sendEmail(data) {
        const mailOptions = {
            from: `Cloud Social WiFi+ <info@seed-soft.com>`,
            replyTo: `info@seed-soft.com`,
            to: `${data.email}`,
        };

        return new Promise((resolve, reject) => {
            let content;
            console.log(data.action.name);
            switch (data.action.name) {
                case 'password-reset':
                    mailOptions.subject = `Password Reset`;
                    this.readFile(__dirname + '/templates/passwordReset.html').then(template => {
                        content = template;
                        content = _.replace(content, /%code%/g, `${data.action.code}`);
                        mailOptions.html = content;
                        console.log(content);
                        mailserver.sendMail(mailOptions, (err, res) => {
                            res ? resolve(res) : reject(err);
                        });
                    }).catch(err => reject(err));
                    break;

                case 'password-changed':
                    mailOptions.subject = `Password Reset`;
                    this.readFile(__dirname + '/templates/passwordChanged.html').then(template => {
                        content = template;
                        content = _.replace(content, /%code%/g, `${data.action.code}`);
                        mailOptions.html = content;
                        mailserver.sendMail(mailOptions, (err, res) => {
                            res ? resolve(res) : reject(err);
                        });
                    }).catch(err => reject(err));
                    break;

                case 'welcome':
                    mailOptions.subject = `Welcome to Cloud Social WiFi+`;
                    this.readFile(__dirname + '/templates/welcome.html').then(template => {
                        content = template;
                        content = _.replace(content, /%name%/g, `${data.action.name}`);
                        mailOptions.html = content;
                        mailserver.sendMail(mailOptions, (err, res) => {
                            res ? resolve(res) : reject(err);
                        });
                    }).catch(err => reject(err));
                    break;

                case 'expiring':
                    mailOptions.subject = `Welcome to Cloud Social WiFi+`;
                    this.readFile(__dirname + '/templates/expiring.html').then(template => {
                        content = template;
                        content = _.replace(content, /%name%/g, `${data.action.name}`);
                        content = _.replace(content, /%site%/g, `${data.action.site}`);
                        content = _.replace(content, /%day%/g, `${data.action.day}`);
                        mailOptions.html = content;
                        mailserver.sendMail(mailOptions, (err, res) => {
                            res ? resolve(res) : reject(err);
                        });
                    }).catch(err => reject(err));
                    break;

                case 'expired':
                    mailOptions.subject = `Welcome to Cloud Social WiFi+`;
                    this.readFile(__dirname + '/templates/expired.html').then(template => {
                        content = template;
                        content = _.replace(content, /%name%/g, `${data.action.name}`);
                        content = _.replace(content, /%site%/g, `${data.action.site}`);
                        content = _.replace(content, /%day%/g, `${data.action.day}`);
                        mailOptions.html = content;
                        mailserver.sendMail(mailOptions, (err, res) => {
                            res ? resolve(res) : reject(err);
                        });
                    }).catch(err => reject(err));
                    break;

                default:
                    mailOptions.subject = `Cloud Social WiFi+`;
                    mailOptions.html = ``;
                    let err = {location: "body", param: "code", msg: 'No content'};
                    let test = [Object.assign({}, err)];
                    reject(test);
                    // return res.status(422).json({errors: test});
                    break;
            }
        });
    }

    readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, res) => {
                // console.log(res);
                res ? resolve(res) : reject(err);
            });
        });
    }
}

module.exports = MailserversComponent;