using System;
using System.Collections.Generic;

namespace ViagemMasterData.Domain.Trips
{
    public class TripMapper
    {

        public TripMapper() { }

        public TripDTO GetTripDTOForTrip(Schema.Trip trip)
        {
            return new TripDTO(trip.Id.ToString().ToUpper(),
                trip.LineId, trip.RouteId, trip.WorkBlockId, trip.StartTime, trip.EndTime);
        }

        public Schema.Trip GetTripForTripDTO(TripDTO tripDTO)
        {
            return new Schema.Trip(tripDTO.Id, tripDTO.LineId, tripDTO.RouteId, tripDTO.WorkBlockId, tripDTO.StartTime, tripDTO.EndTime);
        }

        public TripDTO GetTripDTOForCreateTripAdHocDTO(CreateTripAdHocDTO createTripAdHocDTO)
        {
            return new TripDTO(Guid.NewGuid().ToString().ToUpper(),
                createTripAdHocDTO.LineId, createTripAdHocDTO.RouteId, null, createTripAdHocDTO.StartTime, TimeSpan.Zero);
        }
        
        public List<TripDTO> GetTripDTOListForCreateTripDTO(CreateTripDTO createTripDTO)
        {
            List < TripDTO > tripDTOList = new List<TripDTO>();

            for (int i = 0; i < createTripDTO.NumberOfTrips; i++)
            {
                tripDTOList.Add(new TripDTO(Guid.NewGuid().ToString().ToUpper(), createTripDTO.LineId, 
                    createTripDTO.RouteId, null, createTripDTO.StartTime.Add(TimeSpan.FromMinutes(createTripDTO.Frequency * i)), TimeSpan.Zero));
            }

            return tripDTOList;
        }
        
    }
}
