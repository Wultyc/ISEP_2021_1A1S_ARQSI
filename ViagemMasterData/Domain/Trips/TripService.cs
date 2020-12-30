using ViagemMasterData.Infraestructure;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Domain.TripSchedules;
using System;
using FluentValidation;
using System.Collections.Generic;
using System.Threading.Tasks;

 namespace ViagemMasterData.Domain.Trips
 {   
    public class TripService
    {
        private readonly TripMapper tripMapper = new TripMapper();
        private readonly HttpRequests request = new HttpRequests();

        private readonly TripScheduleService _tripScheduleService;
        private readonly IRepository<Trip> _repository;
        public TripService(IRepository<Trip> repository, TripScheduleService tripScheduleService)
        {
            _repository = repository;
            _tripScheduleService = tripScheduleService;
        }

        public async Task<TripDTO> PostAdHocAsync(CreateTripAdHocDTO createTripAdHocDTO)
        {

            TripDTO tripDTO = tripMapper.GetTripDTOForCreateTripAdHocDTO(createTripAdHocDTO);

            Validate(tripDTO);

            bool validateLine = await request.GetEntityForIdAsync("lines", tripDTO.LineId);
            if (!validateLine)
                throw new BusinessRuleValidationException("Line not found!");

            bool validateRoute = await request.GetEntityForIdAsync("routes", tripDTO.RouteId);
            if (!validateRoute)
                throw new BusinessRuleValidationException("Route not found!");

            _repository.Insert(tripMapper.GetTripForTripDTO(tripDTO));
            _tripScheduleService.PostAsync(tripDTO);
            return tripDTO;
        }

        public async Task<List<TripDTO>> PostAsync(CreateTripDTO createTripDTO)
        {
            if (createTripDTO.Frequency < 1)
                throw new ArgumentException("The trip frequency can't be less than 1.");

            if (createTripDTO.NumberOfTrips < 1)
                throw new ArgumentException("The number of trips can't be less than 1.");

            bool validateLine = await request.GetEntityForIdAsync("lines", createTripDTO.LineId);
            if (!validateLine)
                throw new BusinessRuleValidationException("Line not found!");

            bool validateRoute = await request.GetEntityForIdAsync("routes", createTripDTO.RouteId);
            if (!validateRoute)
                throw new BusinessRuleValidationException("Route not found!");

            List<TripDTO> tripDTOList = tripMapper.GetTripDTOListForCreateTripDTO(createTripDTO);

            for (int i = 0; i < tripDTOList.Count; i++)
            {
                Validate(tripDTOList[i]);
                _repository.Insert(tripMapper.GetTripForTripDTO(tripDTOList[i]));
                _tripScheduleService.PostAsync(tripDTOList[i]);
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
            IList<Trip> tripList = _repository.Select();
            IList<TripDTO> tripDTOList = new List<TripDTO>();

            foreach (Trip trip in tripList)
            {
                tripDTOList.Add(tripMapper.GetTripDTOForTrip(trip));
            }

            return tripDTOList;
        }

        public TripDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            Trip trip = _repository.Select(new TripId(id));

            return tripMapper.GetTripDTOForTrip(trip);
        }

        private static void Validate(TripDTO tripDTO)
        {
            if (tripDTO == null)
                throw new Exception("Trip not detected!");
            
            TripValidator validator = new TripValidator();
            validator.ValidateAndThrow(tripDTO);
        }

    }
}