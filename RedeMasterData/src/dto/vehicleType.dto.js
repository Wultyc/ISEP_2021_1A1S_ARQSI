class VehicleTypeDTO {

    constructor() {}

    ToInsert (req) {
        let vehicleType = {
            description : req.body.description,
            autonomy : req.body.autonomy,
            costPerKilometer : req.body.costPerKilometer,
            averageCost : req.body.averageCost,
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
            averageCost : req.averageCost,
            averageSpeed : req.averageSpeed,
            fuelType : req.fuelType
        };
        return vehicleType;
    };  
}

module.exports = VehicleTypeDTO;