import { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router } from '../routes'
import { accessLogger } from '../middlewares'
import {config} from 'node-config-ts'

const expressLoader = function (app: Application): Application {

    //config express server
    var allowedDomains = config.cors.allowedDomains;
    app.use(cors({
        origin: function (origin, callback) {
            // bypass the requests with no origin (like curl requests, mobile apps, etc )
            if (!origin) return callback(null, true);

            if (allowedDomains.indexOf(origin) === -1) {
                var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    }));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    //middlewares
    app.use(accessLogger) //Log all HTTP requests

    //base routes
    app.use('/', router);

    // Return the express app
    return app;
}

export { expressLoader }