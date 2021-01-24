using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.DTOs.VehicleServiceDTOs;
using ViagemMasterData.Infraestructure;
using ViagemMasterData.Mappers;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Service
{
    public class VehicleServiceService
    {
        private readonly VehicleServiceMapper vehicleServiceMapper = new VehicleServiceMapper();
        
        private readonly IRepository<Schema.VehicleService> _repository;
        private readonly IRepository<Schema.Vehicle> _repositoryV;

        public VehicleServiceService(IRepository<Schema.VehicleService> repository, IRepository<Schema.Vehicle> repositoryV)
        {
            _repository = repository;
            _repositoryV = repositoryV;
        }

        public async Task<VehicleServiceDTO> PostAsync(CreateVehicleServiceDTO createVehicleServiceDTO)
        {

            VehicleServiceDTO vehicleServiceDTO = vehicleServiceMapper.GetDTOFromCreateDTO(createVehicleServiceDTO);

            Domain.VehicleServices.VehicleServices vehicleServiceDomain = vehicleServiceMapper.GetDomainFromVehicleServiceDTO(vehicleServiceDTO);

            await vehicleServiceDomain.Validate();

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

        public IList<VehicleServiceDTO> Get()
        {
            IList<Schema.VehicleService> vehicleServiceList = _repository.Select();
            IList<VehicleServiceDTO> vehicleServiceDTOList = new List<VehicleServiceDTO>();

            foreach (Schema.VehicleService vehicleService in vehicleServiceList)
            { 
                vehicleService.Vehicle = _repositoryV.Select(vehicleService.VehicleId);
                vehicleServiceDTOList.Add(vehicleServiceMapper.GetDTOFromSchema(vehicleService));
            }

            return vehicleServiceDTOList;
        }
    }
}
