const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Segment = require('../models/segment.model');

class SegmentRepository {
    constructor() { }

    getById(id, callback){
        mongoose.model('Segment').findOne({"_id": id}, callback);
    };

    save(segment, callback) {
        console.log('Saving segment in the repository.." ' + segment);
        segment.save(callback);
    };

}

module.exports = SegmentRepository;