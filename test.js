var express = require("express");
var app = express();

const nodemailer = require("nodemailer");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Node Mailer!");
});

app.get("/sent", (req, res) => {
    // setup mail transporter service
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "supportmail@seed-soft.com", // your email
            pass: "seedsoft" // your password
        }
    });

    // setup email data with unicode symbols
    const mailOptions = {
        from: "hs5xrk@hotmail.com", // sender
        to: "hs5xrk@gmail.com", // list of receivers
        subject: "Hello from sender", // Mail subject
        html: "<b>Do you receive this mail?</b>" // HTML body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    });
});


app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
