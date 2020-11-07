const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Segment = require('../models/segment.model');

class SegmentRepository {
    constructor() { }

    getById(id, callback){
        Segment.findOne({"_id": id}, callback);
    };

    getAll(callback) {
        Segment.find(callback); 
    };

    save(segment, callback) {
        console.log('Saving segment in the repository.." ' + segment);
        segment.save(callback);
    };

    delete(id, callback) {
        Segment.findByIdAndRemove(id, callback) 
    };

}

module.exports = SegmentRepository;