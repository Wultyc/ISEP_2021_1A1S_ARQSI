const moment = require('moment');
const config = require('config');
const path = require('path');
const fs = require('fs');

const accessLogger = (req, res, next) => {
    const log = `\n${req.ip} [${moment().format()}] ${req.method} ${req.originalUrl} ${req.protocol}`

    if (config.get('logs.access.enableFileLog') == true)
        fs.appendFileSync(path.join(__dirname, "..", config.get('logs.folder'), config.get('logs.access.logfile')), log, function (err) {
            if (err) return console.log(err);
        });

    if (config.get('logs.access.enableConsoleLog') == true)
        console.log(log);

    next();
}

module.exports = accessLogger;