const nodemailer = require("nodemailer");

const mailserver = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "supportmail@seed-soft.com",
        pass: "seedsoft"
    }
});

module.exports = mailserver;
