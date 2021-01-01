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
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public Trip(string id, string lineId, string routeId, TimeSpan startTime, TimeSpan endTime)
        {
            this.Id = id;
            this.LineId = lineId;
            this.RouteId = routeId;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }
    }
}
