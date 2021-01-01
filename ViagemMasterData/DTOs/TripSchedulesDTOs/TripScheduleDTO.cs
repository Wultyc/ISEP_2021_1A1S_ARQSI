using Newtonsoft.Json;
using System;

namespace ViagemMasterData.DTOs.TripScheduleDTOs
{
    public class TripScheduleDTO
    {
        public string Id { get; set; }
        public string TripId { get; set; }
        public string NodeId { get; set; }
        public int NodeOrder { get; set; }
        public TimeSpan PassingTime { get; set; }

        [JsonConstructor]
        public TripScheduleDTO(string id, string tripId, string nodeId, int nodeOrder, TimeSpan passingTime)
        {
            this.Id = id;
            this.TripId = tripId;
            this.NodeId = nodeId;
            this.NodeOrder = nodeOrder;
            this.PassingTime = passingTime;
        }

    }
}
