using ViagemMasterData.Infraestructure;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Domain.TripSchedules;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ViagemMasterData.Mappers;
using ViagemMasterData.Domain.WorkBlocks;
using ViagemMasterData.DTOs.WorkBlockDTOs;

namespace ViagemMasterData.Service
{   
    public class WorkBlockService
    {
        private readonly WorkBlockMapper workBlockMapper = new WorkBlockMapper();
        private readonly IRepository<Schema.WorkBlock> _repository;
        private readonly TripService _tripService;
        private readonly VehicleServiceService _vehicleServiveService;
        private readonly TripulantServiceService _tripulantServiveService;

        public WorkBlockService(IRepository<Schema.WorkBlock> repository, TripService tripService, 
            VehicleServiceService vehicleServiveService, TripulantServiceService tripulantServiveService)
        {
            _repository = repository;
            _tripService = tripService;
            _vehicleServiveService = vehicleServiveService;
            _tripulantServiveService = tripulantServiveService;
        }

        public List<WorkBlockDTO> PostAsync(CreateWorkBlockDTO createWorkBlockDTO)
        {
            if (createWorkBlockDTO.Frequency < 1)
                throw new ArgumentException("The trip frequency can't be less than 1.");

            if (createWorkBlockDTO.NumberOfWorkBlocks < 1)
                throw new ArgumentException("The number of trips can't be less than 1.");

            dynamic validateTrip = _tripService.Get(createWorkBlockDTO.TripId);
            if (validateTrip == null)
                throw new BusinessRuleValidationException("Trip not found!");

            dynamic validateVehicleService = _vehicleServiveService.Get(createWorkBlockDTO.VehicleServiceId);
            if (validateVehicleService == null)
                throw new BusinessRuleValidationException("Vehicle Service not found!");

            List<WorkBlockDTO> workBlockDTOList = workBlockMapper.GetWorkBlockDTOListForCreateTripWorkBlock(createWorkBlockDTO);

            foreach (WorkBlockDTO workBlockDTO in workBlockDTOList)
            {
                WorkBlock workBlock = workBlockMapper.GetWorkBlockDomainForWorkBlockDTO(workBlockDTO);
                workBlock.Validate();

                _repository.Insert(workBlockMapper.GetWorkBlockForWorkBlockDTO(workBlockDTO));
            }

            return workBlockDTOList;
        }

        public void Delete(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            _repository.Delete(new WorkBlockId(id));
        }

        public IList<WorkBlockDTO> Get()
        {
            IList<Schema.WorkBlock> workBlockList = _repository.Select();
            IList<WorkBlockDTO> workBlockDTOList = new List<WorkBlockDTO>();

            foreach (Schema.WorkBlock workBlock in workBlockList)
            {
                workBlockDTOList.Add(workBlockMapper.GetWorkBlockDTOForWorkBlock(workBlock));
            }

            return workBlockDTOList;
        }

        public WorkBlockDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            Schema.WorkBlock workBlock = _repository.Select(new WorkBlockId(id));
            if (workBlock == null)
            {
                return null;
            }

            return workBlockMapper.GetWorkBlockDTOForWorkBlock(workBlock);
        }

    }
}