using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Domain.Trips;
using ViagemMasterData.Infraestructure;
using ViagemMasterData.DTOs.RedeMasterDataDTOs;
using ViagemMasterData.Mappers;
using ViagemMasterData.Domain.TripSchedules;
using ViagemMasterData.DTOs.TripScheduleDTOs;
using ViagemMasterData.DTOs.TripDTOs;

namespace ViagemMasterData.Service
{
    public class TripScheduleService
    {
        private readonly TripScheduleMapper tripScheduleMapper = new TripScheduleMapper();
        private readonly HttpRequests request = new HttpRequests();

        private readonly IRepository<Schema.TripSchedule> _repository;
        public TripScheduleService(IRepository<Schema.TripSchedule> repository)
        {
            _repository = repository;
        }

        public async Task PostAsync(TripDTO tripDTO)
        {
            RouteDTO routeDTO = await request.GetRouteForIdAsync(tripDTO.RouteId);

            if (routeDTO == null)
                throw new BusinessRuleValidationException("Route not found!");

            tripDTO.EndTime = tripDTO.StartTime.Add(TimeSpan.FromMinutes(routeDTO.duration));

            List<TripScheduleDTO> tripScheduleDTOList = tripScheduleMapper.GetTripScheduleForTripDTOAndRoutDTO(tripDTO, routeDTO);

            foreach (TripScheduleDTO tripScheduleDTO in tripScheduleDTOList)
            {
                TripSchedule tripSchedule = tripScheduleMapper.GetTripScheduleDomainForTripScheduleDTO(tripScheduleDTO);
                tripSchedule.Validate();

                _repository.Insert(tripScheduleMapper.GetTripScheduleForTripScheduleDTO(tripScheduleDTO));
            }
        }

    }
}
