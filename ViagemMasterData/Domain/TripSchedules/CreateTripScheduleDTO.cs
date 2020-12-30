using Newtonsoft.Json;
using System;

namespace ViagemMasterData.Domain.TripSchedules
{
    public class CreateTripScheduleDTO
    {
        public string TripId { get; set; }
        public string NodeId { get; set; }
        public TimeSpan PassingTime { get; set; }

        [JsonConstructor]
        public CreateTripScheduleDTO(string tripId, string nodeId, TimeSpan passingTime)
        {
            this.TripId = tripId;
            this.NodeId = nodeId;
            this.PassingTime = passingTime;
        }

    }
}
