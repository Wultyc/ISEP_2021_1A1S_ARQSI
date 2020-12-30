using System;

namespace ViagemMasterData.Domain.Vehicles
{
    public class VehicleMapper
    {

        public VehicleMapper() { }

        public VehicleDTO GetVehicleDTOForVehicle(Schema.Vehicle vehicle)
        {
            return new VehicleDTO(vehicle.Id.ToString().ToUpper(),
                vehicle.LicencePlate, vehicle.Vin, vehicle.VehicleTypeId, vehicle.StartDate);
        }

        public Schema.Vehicle GetVehicleForVehicleDTO(VehicleDTO vehicleDTO)
        {
            return new Schema.Vehicle(vehicleDTO.Id, vehicleDTO.LicencePlate, vehicleDTO.Vin, vehicleDTO.VehicleTypeId, vehicleDTO.StartDate);
        }

        public VehicleDTO GetVehicleDTOForCreateVehicleDTO(CreateVehicleDTO createVehicleDTO)
        {
            return new VehicleDTO(null,
                createVehicleDTO.LicencePlate, createVehicleDTO.Vin, createVehicleDTO.VehicleTypeId, createVehicleDTO.StartDate);
        }
    }
}
