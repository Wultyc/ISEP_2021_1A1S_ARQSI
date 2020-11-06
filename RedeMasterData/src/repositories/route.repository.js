const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Route = require('../models/route.model');

class RouteRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('Route').findOne({"_id": id}, callback);
    };

    save(route, callback) {
        console.log('Saving route in the repository.." ' + route);
        route.save(callback);
    };

}

module.exports = RouteRepository;