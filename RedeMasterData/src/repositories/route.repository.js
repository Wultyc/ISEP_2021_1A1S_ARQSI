const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Route = require('../models/route.model');

class RouteRepository {
    constructor() { }

    getById(id, callback){
        Route.findOne({"_id": id}, callback).populate('routeNodes.nodeId');
    };

    getAll(callback) {
        Route.find(callback).populate('routeNodes.nodeId'); 
    };

    save(route, callback) {
        console.log('Saving route in the repository.." ' + route);
        const routeModel = new Route(route);
        routeModel.save(callback);
    };

    delete(id, callback) {
        Route.findByIdAndRemove(id, callback) 
    };

}

module.exports = RouteRepository;