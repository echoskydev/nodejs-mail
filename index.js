const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Define public folder 
app.use('/', express.static(__dirname + '/public'));
/**
 * lib body-parser
 * - parse application/x-www-form-urlencoded
 * - parse application/json
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Config project express
 * - New function express
 * - Route express
 */
app.use(require('./configs/config'));
app.use('/api/', require('./configs/route'));

/**
 * Response index.html
 * running port 3000
 */
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.listen(port, () => console.log(`Api listening on port ${port}`))