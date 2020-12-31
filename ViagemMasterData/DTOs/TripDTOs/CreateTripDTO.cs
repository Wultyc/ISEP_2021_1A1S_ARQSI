using Newtonsoft.Json;
using System;

namespace ViagemMasterData.DTOs.TripDTOs
{
    public class CreateTripDTO
    {
        public string LineId { get; set; }
        public string RouteId { get; set; }
        public TimeSpan StartTime { get; set; }
        public int Frequency { get; set; }
        public int NumberOfTrips { get; set; }

        [JsonConstructor]
        public CreateTripDTO(string id, string lineId, string routeId, TimeSpan startTime, int frequency, int numberOfTrips)
        {
            this.LineId = lineId;
            this.RouteId = routeId;
            this.StartTime = startTime;
            this.Frequency = frequency;
            this.NumberOfTrips = numberOfTrips;
        }

    }
}
