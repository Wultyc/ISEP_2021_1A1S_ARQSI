using System;

namespace ViagemMasterData.Domain.Vehicles
{
    public class VehicleMapper
    {

        public VehicleMapper() { }

        public VehicleDTO GetVehicleDTOForVehicle(Vehicle vehicle)
        {
            return new VehicleDTO(vehicle.Id.Value.ToString().ToUpper(),
                vehicle.LicencePlate, vehicle.Vin, vehicle.VehicleType, vehicle.StartDate);
        }

        public Vehicle GetVehicleForVehicleDTO(VehicleDTO vehicleDTO)
        {
            return new Vehicle(vehicleDTO.Code, vehicleDTO.LicencePlate, vehicleDTO.Vin, vehicleDTO.VehicleType, vehicleDTO.StartDate);
        }

        public VehicleDTO GetVehicleDTOForCreateVehicleDTO(CreateVehicleDTO createVehicleDTO)
        {
            return new VehicleDTO(null,
                createVehicleDTO.LicencePlate, createVehicleDTO.Vin, createVehicleDTO.VehicleType, createVehicleDTO.StartDate);
        }
    }
}
