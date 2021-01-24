using ViagemMasterData.Infraestructure;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Domain.TripSchedules;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ViagemMasterData.Mappers;
using ViagemMasterData.Domain.Trips;
using ViagemMasterData.DTOs.TripDTOs;

namespace ViagemMasterData.Service
{   
    public class TripService
    {
        private readonly TripMapper tripMapper = new TripMapper();
        private readonly HttpRequests request = new HttpRequests();

        private readonly TripScheduleService _tripScheduleService;
        private readonly IRepository<Schema.Trip> _repository;
        public TripService(IRepository<Schema.Trip> repository, TripScheduleService tripScheduleService)
        {
            _repository = repository;
            _tripScheduleService = tripScheduleService;
        }

        public async Task<TripDTO> PostAdHocAsync(CreateTripAdHocDTO createTripAdHocDTO)
        {

            TripDTO tripDTO = tripMapper.GetTripDTOForCreateTripAdHocDTO(createTripAdHocDTO);

            Trip trip = tripMapper.GetTripDomainForTripDTO(tripDTO);
            trip.Validate();

            bool validateLine = await request.CheckEntityForIdAsync("lines", tripDTO.LineId);
            if (!validateLine)
                throw new BusinessRuleValidationException("Line not found!");

            bool validateRoute = await request.CheckEntityForIdAsync("routes", tripDTO.RouteId);
            if (!validateRoute)
                throw new BusinessRuleValidationException("Route not found!");

            await _tripScheduleService.PostAsync(tripDTO);
            _repository.Insert(tripMapper.GetTripForTripDTO(tripDTO));
            return tripDTO;
        }

        public async Task<List<TripDTO>> PostAsync(CreateTripDTO createTripDTO)
        {
            if (createTripDTO.Frequency < 1)
                throw new ArgumentException("The trip frequency can't be less than 1.");

            if (createTripDTO.NumberOfTrips < 1)
                throw new ArgumentException("The number of trips can't be less than 1.");

            bool validateLine = await request.CheckEntityForIdAsync("lines", createTripDTO.LineId);
            if (!validateLine)
                throw new BusinessRuleValidationException("Line not found!");

            bool validateRoute = await request.CheckEntityForIdAsync("routes", createTripDTO.RouteId);
            if (!validateRoute)
                throw new BusinessRuleValidationException("Route not found!");

            List<TripDTO> tripDTOList = tripMapper.GetTripDTOListForCreateTripDTO(createTripDTO);

            foreach (TripDTO tripDTO in tripDTOList)
            {
                Trip trip = tripMapper.GetTripDomainForTripDTO(tripDTO);
                trip.Validate();

                await _tripScheduleService.PostAsync(tripDTO);
                _repository.Insert(tripMapper.GetTripForTripDTO(tripDTO));
            }

            return tripDTOList;
        }

        public void Delete(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            _repository.Delete(new TripId(id));
        }

        public IList<TripDTO> Get()
        {
            IList<Schema.Trip> tripList = _repository.Select();
            IList<TripDTO> tripDTOList = new List<TripDTO>();

            foreach (Schema.Trip trip in tripList)
            {
                tripDTOList.Add(tripMapper.GetTripDTOForTrip(trip));
            }

            return tripDTOList;
        }

        public TripDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            Schema.Trip trip = _repository.Select(id);
            if (trip == null)
            {
                return null;
            }

            return tripMapper.GetTripDTOForTrip(trip);
        }

        public IList<TripDTO> GetLines(string lineId)
        {
            IList<Schema.Trip> tripList = _repository.Select();
            IList<TripDTO> tripDTOList = new List<TripDTO>();

            foreach (Schema.Trip trip in tripList)
            {
                tripDTOList.Add(tripMapper.GetTripDTOForTrip(trip));
            }

            IList<TripDTO> tripDTOListWithLineId = new List<TripDTO>();

            foreach (TripDTO tripDTO in tripDTOList)
            {
                if (tripDTO.LineId.ToUpper() == lineId.ToUpper())
                {
                    tripDTOListWithLineId.Add(tripDTO);
                }
            }

            return tripDTOListWithLineId;
        }

    }
}