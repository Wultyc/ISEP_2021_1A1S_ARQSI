const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Segment = require('../models/segment.model');

class SegmentRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('Segment').findOne({"_id": id}, callback);
    };

    getAll(callback) {
        mongoose.model('Segment').find(callback); 
    };

    save(segment, callback) {
        console.log('Saving segment in the repository.." ' + segment);
        segment.save(callback);
    };

    delete(id, callback) {
        mongoose.model('Segment').findByIdAndRemove(id, callback) 
    };

}

module.exports = SegmentRepository;