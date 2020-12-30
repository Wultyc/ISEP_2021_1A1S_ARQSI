using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ViagemMasterData.Schema
{
    public partial class Trip
    {

        public string Id { get; set; }
        public string LineId { get; set; }
        public string RouteId { get; set; }
        public string WorkBlockId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        [JsonConstructor]
        public Trip(string id, string lineId, string routeId, string workBlockId, TimeSpan startTime, TimeSpan endTime)
        {
            Id = id;
            LineId = lineId;
            RouteId = routeId;
            WorkBlockId = workBlockId;
            StartTime = startTime;
            EndTime = endTime;
        }
    }
}
