const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Route = require('../models/route.model');

class RouteRepository {
    constructor() { }

    getById(id, callback){
        Route.findOne({"_id": id}, callback);
    };

    getAll(callback) {
        Route.find(callback); 
    };

    save(route, callback) {
        console.log('Saving route in the repository.." ' + route);
        route.save(callback);
    };

    delete(id, callback) {
        Route.findByIdAndRemove(id, callback) 
    };

}

module.exports = RouteRepository;