const mongoose = require('mongoose');
const TripulantTypeModel = require('../models/tripulantType.model');
var ObjectID = require('mongodb').ObjectID;

class TripulantTypeRepository {
    constructor() { }

    saveTrip(tripulantType, callback) {
        console.log('saving tripulant type in the repository ' + tripulantType);
        tripulantType.save(callback);
    };

}

module.exports = TripulantTypeRepository;