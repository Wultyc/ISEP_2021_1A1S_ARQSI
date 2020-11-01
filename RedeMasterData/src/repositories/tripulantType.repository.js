const mongoose = require('mongoose');
const TripulantTypeModel = require('../models/tripulantType.model');
var ObjectID = require('mongodb').ObjectID;

class TripulantTypeRepository {
    constructor() { }

<<<<<<< HEAD
    saveTrip(tripulantType, callback) {
        console.log('saving tripulant type in the repository ' + tripulantType);
        tripulantType.save(callback);
=======
    save(tripulantType, callback) {
        console.log('saving tripulant type in the repository ' + tripulantType);
        tripulantType.save();
>>>>>>> 0364389a3f6ec363129cac8cf6794b9942e49f3a
    };

}

module.exports = TripulantTypeRepository;