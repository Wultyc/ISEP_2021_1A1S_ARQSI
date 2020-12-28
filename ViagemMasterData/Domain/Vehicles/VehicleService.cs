using ViagemMasterData.Infrastructure.Shared;
using ViagemMasterData.Domain.Shared;
using System;
using FluentValidation;
using System.Collections.Generic;

 namespace ViagemMasterData.Domain.Vehicles
 {   
    public class VehicleService
    {
        private readonly VehicleMapper vehicleMapper;
        private readonly IRepository<Vehicle> _repository;

        public VehicleService(IRepository<Vehicle> repository)
        {
            _repository = repository;
        }

        public VehicleDTO Post(CreateVehicleDTO createVehicleDTO)
        {

            VehicleDTO vehicleDTO = vehicleMapper.GetVehicleDTOForCreateVehicleDTO(createVehicleDTO);
            vehicleDTO.Code = Guid.NewGuid().ToString().ToUpper();

            Validate(vehicleDTO);

            // TODO: Validate Vehicle Type

            _repository.Insert(vehicleMapper.GetVehicleForVehicleDTO(vehicleDTO));
            return vehicleDTO;
        }

        public VehicleDTO Put(VehicleDTO vehicleDTO)
        {
            Validate(vehicleDTO);

            // TODO: Validate Vehicle Type

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