const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const routes = require('../routes')
const { accessLogger } = require('../middlewares')

const expressApp = function (app) {

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
    app.use('/', routes);

    // Return the express app
    return app;
}

module.exports = expressApp