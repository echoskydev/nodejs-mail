const nodeMailer = require("nodemailer");

const mailserver = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "supportmail@seed-soft.com",
        pass: "seedsoft"
    }
});

module.exports = mailserver;
