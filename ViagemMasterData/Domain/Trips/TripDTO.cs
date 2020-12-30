using Newtonsoft.Json;
using System;

namespace ViagemMasterData.Domain.Trips
{
    public class TripDTO
    {
        public string Id { get; set; }
        public string LineId { get; set; }
        public string RouteId { get; set; }
        public string WorkBlockId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        [JsonConstructor]
        public TripDTO(string id, string lineId, string routeId, string workBlockId, TimeSpan startTime, TimeSpan endTime)
        {
            this.Id = id;
            this.LineId = lineId;
            this.RouteId = routeId;
            this.WorkBlockId = workBlockId;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }

    }
}
