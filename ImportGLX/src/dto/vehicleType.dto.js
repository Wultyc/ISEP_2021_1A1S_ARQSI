VehicleTypeDTO = function (glx_entry) {
    let vehicleType = {
        system_id: "",
        glx_id: glx_entry.key,
        data: {
            description: glx_entry.Name,
            autonomy: glx_entry.Autonomy,
            costPerKilometer: glx_entry.Cost,
            avarageCost: glx_entry.Consumption,
            averageSpeed: glx_entry.AverageSpeed,
            fuelType: fuelTypeMap[glx_entry.EnergySource]
        },
        status: "Not Processed"
    };
    return vehicleType;
}

const fuelTypeMap = {
    "23": "Gasoleo",
    "20": "GPL",
    "50": "Hidrogenio",
    "75": "Eletrico",
    "1": "Gasolina"
}

module.exports = VehicleTypeDTO;