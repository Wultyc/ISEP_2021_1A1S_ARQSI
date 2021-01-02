using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.DTOs.VehicleServiceDTOs;
using ViagemMasterData.Infraestructure;
using ViagemMasterData.Mappers;

namespace ViagemMasterData.Service
{
    public class VehicleServiceService
    {
        private readonly VehicleServiceMapper vehicleServiceMapper = new VehicleServiceMapper();
        
        private readonly IRepository<Schema.VehicleService> _repository;

        public VehicleServiceService(IRepository<Schema.VehicleService> repository)
        {
            _repository = repository;
        }

        public async Task<VehicleServiceDTO> PostAsync(CreateVehicleServiceDTO createVehicleServiceDTO)
        {

            VehicleServiceDTO vehicleServiceDTO = vehicleServiceMapper.GetDTOFromCreateDTO(createVehicleServiceDTO);

            Domain.VehicleServices.VehicleServices vehicleServiceDomain = vehicleServiceMapper.GetDomainFromTripulantDTO(vehicleServiceDTO);

            await vehicleServiceDomain.Validate(vehicleServiceDomain);

            _repository.Insert(vehicleServiceMapper.GetSchemaFromDomain(vehicleServiceDomain));

            vehicleServiceDTO = vehicleServiceMapper.GetDTOFromDomain(vehicleServiceDomain);
            return vehicleServiceDTO;
        }

        public VehicleServiceDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            Schema.VehicleService vehicleService = _repository.Select(id);
            if (vehicleService == null)
            {
                return null;
            }
            return vehicleServiceMapper.GetDTOFromSchema(vehicleService);
        }
    }
}
