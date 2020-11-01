const _ = require('lodash');
const Type = require('../../models/tripulantType.model');
const TripulantTypeService = require('../../services/tripulantType.service');
const dto = require('../../dto/tripulantType.dto');

const service = new TripulantTypeService();
var transform = new dto();

exports.tripulantType_create = function (req, res) {

    let TripulantType = transform.ToInsert(req);
//  if(!service.Validate(Type)) {
//      // implementar erro de retorno aqui
//  }
//  else {
     service.TripulantTypeCreate(TripulantType, function (err, params){
        if (err) {
            return res.send(err);
                    }
        res.json(transform.ToDTO(params));
     })
     
   };
// }

