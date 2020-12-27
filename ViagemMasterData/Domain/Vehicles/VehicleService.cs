using ViagemMasterData.Infrastructure.Shared;
using ViagemMasterData.Domain.Shared;
using System;
using FluentValidation;
using System.Collections.Generic;

 namespace ViagemMasterData.Domain.Vehicles
 {   
    public class VehicleService
    {

        private readonly IRepository<Vehicle> _repository;

        public VehicleService(IRepository<Vehicle> repository)
        {
            _repository = repository;
        }

        public VehicleDTO Post(CreateVehicleDTO createVehicleDTO)
        {

            VehicleDTO vehicleDTO = new VehicleDTO(createVehicleDTO);
            vehicleDTO.Code = Guid.NewGuid().ToString().ToUpper();

            Validate(vehicleDTO);

            // TODO: Validate Vehicle Type

            _repository.Insert(vehicleDTO.ToVehicle());
            return vehicleDTO;
        }

        public VehicleDTO Put(VehicleDTO vehicleDTO)
        {
            Validate(vehicleDTO);

            // TODO: Validate Vehicle Type

            _repository.Update(vehicleDTO.ToVehicle());
            return vehicleDTO;
        }

        public void Delete(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            _repository.Delete(id);
        }

        public IList<VehicleDTO> Get()
        {
            IList<Vehicle> vehicleList = _repository.Select();
            IList<VehicleDTO> vehicleDTOList = new List<VehicleDTO>();

            foreach (Vehicle vehicle in vehicleList)
            {
                vehicleDTOList.Add(new VehicleDTO(vehicle));
            }

            return vehicleDTOList;
        }

        public VehicleDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            return new VehicleDTO(_repository.Select(new VehicleId(id)));
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