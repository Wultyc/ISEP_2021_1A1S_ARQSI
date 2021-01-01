import {Request, Response, NextFunction} from 'express'
import moment from 'moment';
import Logger from '../utils/Logger'

const accessLogger = (req: Request, res: Response, next: NextFunction) => {

    const logger = new Logger("request")
    logger.requestLog(req.ip,req.method,req.originalUrl,req.protocol,req.query,req.headers,req.body)    

    next();
}

export {accessLogger};