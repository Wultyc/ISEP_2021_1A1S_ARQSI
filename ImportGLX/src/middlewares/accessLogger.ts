import {Request, Response, NextFunction} from 'express'
import moment from 'moment';
import {config} from 'node-config-ts';
import path from 'path';
import fs from 'fs';

const accessLogger = (req: Request, res: Response, next: NextFunction) => {
    const log = `\n${req.ip} [${moment().format()}] ${req.method} ${req.originalUrl} ${req.protocol}`

    if (config.logs.access.enableFileLog == true)
        fs.appendFileSync(path.join(__dirname, "../..", config.logs.folder, config.logs.access.logfile), log);

    if (config.logs.access.enableConsoleLog == true)
        console.log(log);

    next();
}

export {accessLogger};