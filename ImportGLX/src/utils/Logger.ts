import moment from 'moment';
import { config } from 'node-config-ts';
import path from 'path';
import fs from 'fs';

export default class Logger {
    loggerType: String
    logMessage: string
    logFilePath: string
    enableConsoleLog: boolean
    enableFileLog: boolean

    constructor(loggerType: String) {
        this.loggerType = loggerType
        this.setup()
    }

    log() {

    }

    requestLog(ip: String, method: String, originalUrl: String, protocol: String, query: any, headers: any, body: any) {
        const request = {query,headers,body}
        const requestStr = JSON.stringify(request, null, 2)
        const logString = `${ip} ${method} ${originalUrl} ${protocol}\n${requestStr}`
        this.makeLog(logString)
    }

    private makeLog(logString) {
        this.logMessage = `[${moment().format()}] ${logString}`
        this.printLog()
        this.writeLog()
    }

    private writeLog() {
        if (this.enableFileLog)
            fs.appendFileSync(this.logFilePath, this.logMessage);
    }
    private printLog() {
        if (this.enableConsoleLog)
            console.log(this.logMessage);
    }

    private setup() {
        this.logFilePath = path.join(__dirname, "../..", config.logs.folder, (this.loggerType == "request")?config.logs.access.logfile:config.logs.any.logfile)
        this.enableConsoleLog = config.logs.access.enableConsoleLog
        this.enableFileLog = config.logs.access.enableFileLog
    }

}