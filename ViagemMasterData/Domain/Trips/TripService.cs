using ViagemMasterData.Infraestructure;
using ViagemMasterData.Domain.Shared;
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
        private readonly IRepository<Trip> _repository;

        public TripService(IRepository<Trip> repository)
        {
            _repository = repository;
        }

        public async Task<TripDTO> PostAdHocAsync(CreateTripAdHocDTO createTripAdHocDTO)
        {

            TripDTO tripDTO = tripMapper.GetTripDTOForCreateTripAdHocDTO(createTripAdHocDTO);
            tripDTO.Id = Guid.NewGuid().ToString().ToUpper();

            Validate(tripDTO);

            bool validateLine = await request.GetEntityForIdAsync("lines", tripDTO.LineId);

            if (!validateLine)
                throw new BusinessRuleValidationException("Line not found!");

            bool validateRoute = await request.GetEntityForIdAsync("routes", tripDTO.RouteId);

            if (!validateRoute)
                throw new BusinessRuleValidationException("Route not found!");

            _repository.Insert(tripMapper.GetTripForTripDTO(tripDTO));
            return tripDTO;
        }

        public async Task<TripDTO> PostAsync(CreateTripDTO createTripDTO)
        {

            //TripDTO tripDTO = tripMapper.GetTripDTOForCreatetripDTO(createTripDTO);
            TripDTO tripDTO = null;
            tripDTO.Id = Guid.NewGuid().ToString().ToUpper();

            Validate(tripDTO);

            /*
            bool validateTripType = await request.GetEntityForIdAsync("vehicle-types", tripDTO.VehicleTypeId);

            if (!validateVehicleType)
                throw new BusinessRuleValidationException("Vehicle-Type not found!");
            */

            _repository.Insert(tripMapper.GetTripForTripDTO(tripDTO));
            return tripDTO;
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