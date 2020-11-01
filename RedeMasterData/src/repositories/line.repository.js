const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const Line = require('../models/line.model');

class LineRepository {
    constructor() { }

    save(line, callback) {
        console.log('Saving line in the repository.." ' + line);
        line.save(callback);
    };

}

module.exports = LineRepository;