const nodeMailer = require("nodemailer");

const mailserver = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "xxxxxx@gmail.com",
        pass: "xxxxxx"
    }
});

module.exports = mailserver;
