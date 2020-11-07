const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Route = require('../models/route.model');

class RouteRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('Route').findOne({"_id": id}, callback);
    };

    getAll(callback) {
        mongoose.model('Route').find(callback); 
    };

    save(route, callback) {
        console.log('Saving route in the repository.." ' + route);
        route.save(callback);
    };

    delete(id, callback) {
        mongoose.model('Route').findByIdAndRemove(id, callback) 
    };

}

module.exports = RouteRepository;