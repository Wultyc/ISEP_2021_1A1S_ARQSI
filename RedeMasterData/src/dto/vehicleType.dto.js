class VehicleTypeDTO {

    constructor() {}

    ToInsert (req) {
        let vehicleType = {
            description : req.body.description,
            autonomy : req.body.autonomy,
            costPerKilometer : req.body.costPerKilometer,
            avarageCost : req.body.avarageCost,
            averageSpeed : req.body.averageSpeed,
            fuelType : req.body.fuelType
        };
        return vehicleType;
    };

    ToDTO(req){
        if(req == null) return 'Vehicle type does not exist.';
        let vehicleType = {
            id: req.id,
            description : req.description,
            autonomy : req.autonomy,
            costPerKilometer : req.costPerKilometer,
            avarageCost : req.avarageCost,
            averageSpeed : req.averageSpeed,
            fuelType : req.fuelType
        };
        return vehicleType;
    };  
}

module.exports = VehicleTypeDTO;