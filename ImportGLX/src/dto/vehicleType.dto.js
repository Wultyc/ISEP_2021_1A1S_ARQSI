class VehicleTypeDTO {

    constructor() { }

    ToInsert(req) {
        let vehicleType = new VehicleType({
            system_id: "",
            glx_id: "",
            data: {
                description: req.body.description,
                autonomy: req.body.autonomy,
                costPerKilometer: req.body.costPerKilometer,
                avarageCost: req.body.avarageCost,
                averageSpeed: req.body.averageSpeed,
                fuelType: req.body.fuelType
            },
            status: ""
        });
        return vehicleType;
    };
}

module.exports = VehicleTypeDTO;