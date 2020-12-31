using ViagemMasterData.Infraestructure;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Schema;
using System;
using FluentValidation;
using System.Collections.Generic;
using System.Threading.Tasks;
using ViagemMasterData.Mappers;

namespace ViagemMasterData.Domain.Vehicles
 {   
    public class VehicleService
    {
        private readonly VehicleMapper vehicleMapper = new VehicleMapper();
        private readonly HttpRequests request = new HttpRequests();
        private readonly IRepository<Schema.Vehicle> _repository;

        public VehicleService(IRepository<Schema.Vehicle> repository)
        {
            _repository = repository;
        }

        public async Task<VehicleDTO> PostAsync(CreateVehicleDTO createVehicleDTO)
        {

            VehicleDTO vehicleDTO = vehicleMapper.GetVehicleDTOForCreateVehicleDTO(createVehicleDTO);

            Validate(vehicleDTO);

            bool validateVehicleType = await request.CheckEntityForIdAsync("vehicle-types", vehicleDTO.VehicleTypeId);

            if (!validateVehicleType)
                throw new BusinessRuleValidationException("Vehicle-Type not found!");

            _repository.Insert(vehicleMapper.GetVehicleForVehicleDTO(vehicleDTO));
            return vehicleDTO;
        }

        public async Task<VehicleDTO> Put(VehicleDTO vehicleDTO)
        {
            Validate(vehicleDTO);

            bool validateVehicleType = await request.CheckEntityForIdAsync("vehicle-types", vehicleDTO.VehicleTypeId);

            if (!validateVehicleType)
                throw new BusinessRuleValidationException("Vehicle-Type not found!");

            _repository.Update(vehicleMapper.GetVehicleForVehicleDTO(vehicleDTO));
            return vehicleDTO;
        }

        public void Delete(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            _repository.Delete(new VehicleId(id));
        }

        public IList<VehicleDTO> Get()
        {
            IList<Schema.Vehicle> vehicleList = _repository.Select();
            IList<VehicleDTO> vehicleDTOList = new List<VehicleDTO>();

            foreach (Schema.Vehicle vehicle in vehicleList)
            {
                vehicleDTOList.Add(vehicleMapper.GetVehicleDTOForVehicle(vehicle));
            }

            return vehicleDTOList;
        }

        public VehicleDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            Schema.Vehicle vehicle = _repository.Select(id);
            if (vehicle == null)
            {
                return null;
            }
            return vehicleMapper.GetVehicleDTOForVehicle(vehicle);
        }

        private static void Validate(VehicleDTO vehicleDTO)
        {
            if (vehicleDTO == null)
                throw new Exception("Vehicle not detected!");
            
            VehicleValidator validator = new VehicleValidator();
            validator.ValidateAndThrow(vehicleDTO);
        }

    }
}