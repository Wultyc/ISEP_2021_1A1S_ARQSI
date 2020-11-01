const _ = require('lodash');
const Type = require('../../models/tripulantType.model');
const TripulantTypeService = require('../../services/tripulantType.service');
const dto = require('../../dto/tripulantType.dto');

const service = new TripulantTypeService();
var transform = new dto();

exports.tripulantType_create = function (req, res) {

    
    let TripulantType = transform.ToInsert(req);
    
    if (!service.validate(req)) {
        
        res.send('Error - description value cannot be null');

    }
    else {
        service.TripulantTypeCreate(TripulantType, function (err, params){
        
        res.json(transform.ToDTO(params));

    })
        res.status(200);
        res.send("Inserted with success");
    }

    
    
   };


