using System;
using System.Collections.Generic;

namespace ViagemMasterData.Schema
{
    public partial class TripSchedule
    {
        public string Id { get; set; }
        public string TripId { get; set; }
        public string NodeId { get; set; }
        public TimeSpan PassingTime { get; set; }

        public TripSchedule(string id, string tripId, string nodeId, TimeSpan passingTime)
        {
            this.Id = id;
            this.TripId = tripId;
            this.NodeId = nodeId;
            this.PassingTime = passingTime;
        }

    }
}
