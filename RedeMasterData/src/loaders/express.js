const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('../routes')

const expressApp = function(app) {

    //config express server
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    //middlewares

    //base routes
    app.use('/', routes);

    // Return the express app
    return app;
}

module.exports = expressApp