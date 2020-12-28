using ViagemMasterData.Infraestructure;
using ViagemMasterData.Domain.Shared;
using System;
using FluentValidation;
using System.Collections.Generic;
using System.Threading.Tasks;

 namespace ViagemMasterData.Domain.Vehicles
 {   
    public class VehicleService
    {
        private readonly VehicleMapper vehicleMapper = new VehicleMapper();
        private readonly HttpRequests request = new HttpRequests();
        private readonly IRepository<Vehicle> _repository;

        public VehicleService(IRepository<Vehicle> repository)
        {
            _repository = repository;
        }

        public async Task<VehicleDTO> PostAsync(CreateVehicleDTO createVehicleDTO)
        {

            VehicleDTO vehicleDTO = vehicleMapper.GetVehicleDTOForCreateVehicleDTO(createVehicleDTO);
            vehicleDTO.Code = Guid.NewGuid().ToString().ToUpper();

            Validate(vehicleDTO);

            bool validateVehicleType = await request.GetEntityForIdAsync("vehicle-types", vehicleDTO.VehicleType);

            if (!validateVehicleType)
                throw new BusinessRuleValidationException("Vehicle-Type not found!");

            _repository.Insert(vehicleMapper.GetVehicleForVehicleDTO(vehicleDTO));
            return vehicleDTO;
        }

        public async Task<VehicleDTO> Put(VehicleDTO vehicleDTO)
        {
            Validate(vehicleDTO);

            bool validateVehicleType = await request.GetEntityForIdAsync("vehicle-types", vehicleDTO.VehicleType);

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
            IList<Vehicle> vehicleList = _repository.Select();
            IList<VehicleDTO> vehicleDTOList = new List<VehicleDTO>();

            foreach (Vehicle vehicle in vehicleList)
            {
                vehicleDTOList.Add(vehicleMapper.GetVehicleDTOForVehicle(vehicle));
            }

            return vehicleDTOList;
        }

        public VehicleDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            Vehicle vehicle = _repository.Select(new VehicleId(id));

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