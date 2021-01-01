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
                vehicleService.VehicleId, vehicleService.Date, vehicleService.WorkBlocks.ToList());
        }

        public Domain.VehicleServices.VehicleServices GetDomainFromTripulantDTO(VehicleServiceDTO vehicleServiceDTO)
        {
            return new Domain.VehicleServices.VehicleServices(vehicleServiceDTO.Id, vehicleServiceDTO.VehicleId, vehicleServiceDTO.Date);
        }

        public Schema.VehicleService GetSchemaFromDomain(Domain.VehicleServices.VehicleServices vehicleServices)
        {

            return new Schema.VehicleService(vehicleServices.Id.Value.ToString(), vehicleServices.VehicleId.Value.ToString(), vehicleServices.Date);
        }

        public VehicleServiceDTO GetTripulantDTOFromCreateTripulantDTO(CreateVehicleServiceDTO createVehicleServiceDTO)
        {
            return new VehicleServiceDTO(null,
                createVehicleServiceDTO.VehicleId, createVehicleServiceDTO.Date, null);
        }
    }
}
