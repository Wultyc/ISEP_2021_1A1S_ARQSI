using System;
using ViagemMasterData.Domain.Vehicles;
using ViagemMasterData.DTOs.VehicleDTOs;

namespace ViagemMasterData.Mappers
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
            return new VehicleDTO(Guid.NewGuid().ToString().ToUpper(),
                createVehicleDTO.LicencePlate, createVehicleDTO.Vin, createVehicleDTO.VehicleTypeId, createVehicleDTO.StartDate);
        }

        public Vehicle GetVehicleDomainForVehicleDTO(VehicleDTO vehicleDTO)
        {
            return new Vehicle(vehicleDTO.Id, vehicleDTO.LicencePlate, vehicleDTO.Vin, vehicleDTO.VehicleTypeId, vehicleDTO.StartDate);
        }
    }
}
