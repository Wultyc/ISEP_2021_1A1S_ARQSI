const mongoose = require('mongoose');
const _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;
const Line = require('../models/line.model');

class LineRepository {
    constructor() { }

    getById(id, callback){
        Line.findOne({"_id": id}, callback).populate(['lineRoutes.routeId', 'beginNode','finalNode']);
    };

    getRouteById(id, callback){
        Line.findOne({"_id": id}, callback).populate(['lineRoutes.routeId', 'lineRoutes.routeId.routeNodes.nodeId']);
    };

    getByFilter(query, sortString, callback){
        Line.find(query, callback).populate(['lineRoutes','beginNode','finalNode']).sort(sortString);
    };
    
    save(line, callback) {
        console.log('Saving line in the repository.." ' + line);
        const lineModel = new Line(line);
        lineModel.save(callback);
    };

    delete(id, callback) {
        Line.findByIdAndRemove(id, callback);
    };

    updateRoutes(id, routes, callback) {
        Line.findByIdAndUpdate({"_id": id}, {"lineRoutes": routes}, callback);
    };

}

module.exports = LineRepository;