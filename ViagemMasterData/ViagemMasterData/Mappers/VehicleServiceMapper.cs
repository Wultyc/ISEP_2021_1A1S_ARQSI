using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.DTOs.VehicleServiceDTOs;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Mappers
{
    public class VehicleServiceMapper
    {
        public VehicleServiceMapper() { }
        public VehicleServiceDTO GetDTOFromSchema(Schema.VehicleService vehicleService)
        {
            return new VehicleServiceDTO(vehicleService.Id.ToString().ToUpper(),
                vehicleService.VehicleId, vehicleService.Vehicle, vehicleService.Date);
        }

        public Domain.VehicleServices.VehicleServices GetDomainFromVehicleServiceDTO(VehicleServiceDTO vehicleServiceDTO)
        {
            return new Domain.VehicleServices.VehicleServices(vehicleServiceDTO.Id, vehicleServiceDTO.VehicleId, vehicleServiceDTO.Date);
        }

        public Schema.VehicleService GetSchemaFromDomain(Domain.VehicleServices.VehicleServices vehicleServices)
        {

            return new Schema.VehicleService(vehicleServices.Id.Value.ToString(), vehicleServices.VehicleId.Value.ToString(), vehicleServices.Date);
        }

        public VehicleServiceDTO GetDTOFromCreateDTO(CreateVehicleServiceDTO createVehicleServiceDTO)
        {
            return new VehicleServiceDTO(null, createVehicleServiceDTO.VehicleId, null, createVehicleServiceDTO.Date);
        }

        public VehicleServiceDTO GetDTOFromDomain(Domain.VehicleServices.VehicleServices vehicleServices)
        {
            return new VehicleServiceDTO(vehicleServices.Id.Value.ToString(), vehicleServices.VehicleId.Value.ToString(), null, vehicleServices.Date);
        }

    }
}
