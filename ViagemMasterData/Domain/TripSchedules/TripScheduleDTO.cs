using Newtonsoft.Json;
using System;

namespace ViagemMasterData.Domain.TripSchedules
{
    public class TripScheduleDTO
    {
        public string Id { get; set; }
        public string TripId { get; set; }
        public string NodeId { get; set; }
        public TimeSpan PassingTime { get; set; }

        [JsonConstructor]
        public TripScheduleDTO(string id, string tripId, string nodeId, TimeSpan passingTime)
        {
            this.Id = id;
            this.TripId = tripId;
            this.NodeId = nodeId;
            this.PassingTime = passingTime;
        }

    }
}
