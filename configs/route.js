const router = require('express').Router();
const {check, validationResult} = require('express-validator/check');
const _ = require('lodash');


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
        .not().isEmpty()
        .withMessage(msgRequired)
        .custom(action => {
            // console.log(action);
            if (_.isUndefined(action)) {
                return Promise.reject(`${msgRequired} action`)
            }
            if (_.isUndefined(action.name)) {
                return Promise.reject(`${msgRequired} action's name`)
            } else {
                switch (action.name) {
                    case 'password-reset':
                        if (_.isUndefined(action.code)) {
                            return Promise.reject(`${msgRequired} code`)
                        }
                        break;
                    case 'password-changed':
                        if (_.isUndefined(action.username)) {
                            return Promise.reject(`${msgRequired} username`)
                        }
                        break;
                    case 'welcome':
                        if (_.isUndefined(action.uname)) {
                            return Promise.reject(`${msgRequired} customer's name`)
                        }
                        break;
                    case 'expiring':
                        if (_.isUndefined(action.uname)) {
                            return Promise.reject(`${msgRequired} customer's name`)
                        }
                        if (_.isUndefined(action.site)) {
                            return Promise.reject(`${msgRequired} site`)
                        }
                        if (_.isUndefined(action.day)) {
                            return Promise.reject(`${msgRequired} day`)
                        }
                        if (_.isUndefined(action.date)) {
                            return Promise.reject(`${msgRequired} date`)
                        }
                        break;
                    case 'expired':
                        if (_.isUndefined(action.uname)) {
                            return Promise.reject(`${msgRequired} customer's name`)
                        }
                        if (_.isUndefined(action.site)) {
                            return Promise.reject(`${msgRequired} site`)
                        }
                        if (_.isUndefined(action.date)) {
                            return Promise.reject(`${msgRequired} date`)
                        }
                        break;
                }
            }
            return Promise.resolve();
        }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    // console.log('ok');
    res.sendAsyncApi(Mailservers.sendEmail(req.body));
});

module.exports = router;