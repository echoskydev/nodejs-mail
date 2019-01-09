const router = require('express').Router();
const {check, validationResult} = require('express-validator/check');

// Message Validation
const msgRequired = 'กรุณากรอกข้อมูล';
const msgIsEmail = 'กรุณากรอกข้อมูลให้อยู่ในรูปแบบอีเมล'
const msgIsNumeric = 'กรุณากรอกข้อมูลให้อยู่ในรูปแบบตัวเลข';
const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Components

// Route Mailserver
const MailserversComponent = require('../components/mailserver/mailservers.component');
const Mailservers = new MailserversComponent();
router.post('/v1/mailservers', [
    check('email')
        .not().isEmpty().withMessage(msgRequired)
        .isEmail().withMessage(msgIsEmail),
    check('action')
        .not().isEmpty().withMessage(msgRequired)
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    res.sendAsyncApi(Mailservers.sendEmail(req.body));
})

module.exports = router;