const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Segment = require('../models/segment.model');

class SegmentRepository {
    constructor() { }

    save(segment, callback) {
        console.log('Saving segment in the repository.." ' + segment);
        segment.save(callback);
    };

}

module.exports = SegmentRepository;