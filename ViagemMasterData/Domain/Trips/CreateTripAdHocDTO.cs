using Newtonsoft.Json;
using System;

namespace ViagemMasterData.Domain.Trips
{
    public class CreateTripAdHocDTO
    {
        public string LineId { get; set; }
        public string RouteId { get; set; }
        public TimeSpan StartTime { get; set; }

        [JsonConstructor]
        public CreateTripAdHocDTO(string lineId, string routeId, TimeSpan startTime)
        {
            this.LineId = lineId;
            this.RouteId = routeId;
            this.StartTime = startTime;
        }

    }
}
