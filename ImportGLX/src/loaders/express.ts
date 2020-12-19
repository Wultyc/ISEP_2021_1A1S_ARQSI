import {Application} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import {router} from '../routes'
import { accessLogger } from '../middlewares'

const expressLoader = function (app: Application): Application {

    // enable files upload
    app.use(fileUpload({
        createParentPath: true
    }));

    //config express server
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    //middlewares
    app.use(accessLogger) //Log all HTTP requests

    //base routes
    app.use('/', router);

    // Return the express app
    return app;
}

export {expressLoader}