using System;

namespace ViagemMasterData.Domain.Trips
{
    public class TripMapper
    {

        public TripMapper() { }

        public TripDTO GetTripDTOForTrip(Trip trip)
        {
            return new TripDTO(trip.Id.Value.ToString().ToUpper(),
                trip.LineId, trip.RouteId, trip.WorkBlockId, trip.StartTime, trip.EndTime);
        }

        public Trip GetTripForTripDTO(TripDTO tripDTO)
        {
            return new Trip(tripDTO.Id, tripDTO.LineId, tripDTO.RouteId, tripDTO.WorkBlockId, tripDTO.StartTime, tripDTO.EndTime);
        }

        public TripDTO GetTripDTOForCreateTripAdHocDTO(CreateTripAdHocDTO createTripAdHocDTO)
        {
            return new TripDTO(null,
                createTripAdHocDTO.LineId, createTripAdHocDTO.RouteId, null, createTripAdHocDTO.StartTime, TimeSpan.Zero);
        }
        /*
        public List<TripDTO> GetTripDTOListForCreateTripDTO(CreateTripDTO createTripDTO)
        {
            // Validate (on service) createTripDTO frequency and number of times
            return new TripDTO(null,
                createTripDTO.LicencePlate, createTripDTO.Vin, createTripDTO.TripTypeId, createTripDTO.StartDate);
        }
        */
    }
}
