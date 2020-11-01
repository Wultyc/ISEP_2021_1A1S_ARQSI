const mongoose = require('mongoose');
const TripulantTypeModel = require('../models/tripulantType.model');
var ObjectID = require('mongodb').ObjectID;

class TripulantTypeRepository {
    constructor() { }

    saveTrip(TripulantType, callback) {
        console.log('saving tripulant type in the repository ' + TripulantType);
        TripulantType.save();
    };

}

module.exports = TripulantTypeRepository;