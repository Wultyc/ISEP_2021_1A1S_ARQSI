import moment from 'moment';
import { config } from 'node-config-ts';
import caller from 'caller'
import path from 'path';
import fs from 'fs';

export default class Logger {
    loggerType: String
    loggerLocation: String
    logLevel: "INFO" | "DEBUG" | "WARNING" | "ERROR"
    logMessage: string
    logFilePath: string
    enableConsoleLog: boolean
    enableFileLog: boolean

    constructor(loggerType?: String) {
        this.loggerType = loggerType || "any"
        this.setup()
    }

    log(message: any, keyname?: String, keyvalue?: String) {
        this.logLevel = 'INFO'
        const logString = `${this.loggerLocation} keyname:${keyname || ""} keyvalue:${keyvalue || ""} \n${message}`
        this.makeLog(logString)
    }

    logError(message: any, keyname?: String, keyvalue?: String) {
        this.logLevel = 'ERROR'
        const logString = `${this.loggerLocation} keyname:${keyname || ""} keyvalue:${keyvalue || ""} \n${message}`
        this.makeLog(logString)
    }

    requestLog(ip: String, method: String, originalUrl: String, protocol: String, query: any, headers: any, body: any) {
        this.logLevel = 'INFO'
        const request = {query,headers,body}
        const requestStr = JSON.stringify(request, null, 2)
        const logString = `${ip} ${method} ${originalUrl} ${protocol}\n${requestStr}`
        this.makeLog(logString)
    }

    private makeLog(logString) {
        this.logMessage = `\n[${moment().format()}] [${this.logLevel}] ${logString}`
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
        const logFileName = (this.loggerType == "request")?config.logs.access.logfile:config.logs.any.logfile
        const filename = `${moment().format(config.logs.fileNameTimeStampFormat)}_${logFileName}`
        this.logFilePath = path.join(__dirname, "../..", config.logs.folder, filename)
        this.enableConsoleLog = config.logs.access.enableConsoleLog
        this.enableFileLog = config.logs.access.enableFileLog
        this.loggerLocation = caller(2).replace(path.resolve('./'),"")
        this.logLevel = 'INFO'
    }

}