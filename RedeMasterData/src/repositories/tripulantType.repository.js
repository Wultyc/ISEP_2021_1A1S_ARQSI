const mongoose = require('mongoose');
const TripulantTypeModel = require('../models/tripulantType.model');
var ObjectID = require('mongodb').ObjectID;

class TripulantTypeRepository {
    constructor() { }

    save(tripulantType, callback) {
        console.log('saving tripulant type in the repository ' + tripulantType);
        tripulantType.save();
    };

}

module.exports = TripulantTypeRepository;