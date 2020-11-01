const moment = require('moment');
const config = require('config');
const path = require('path');
const fs = require('fs');

const accessLogger = (req, res, next) => {
    const log = `\n${req.ip} [${moment().format()}] ${req.method} ${req.originalUrl} ${req.protocol}`
    fs.appendFileSync(path.join(__dirname, "..", "logs", "requests.log"), log, function (err) {
        if (err) return console.log(err);
    });
    console.log(log);
    next();
}

module.exports = accessLogger;