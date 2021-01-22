using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class TripSchedule
    {
        public string Id { get; set; }
        public string TripId { get; set; }
        public string NodeId { get; set; }
        public int NodeOrder { get; set; }
        public TimeSpan PassingTime { get; set; }

        public virtual Trip Trip { get; set; }
        public TripSchedule(string id, string tripId, string nodeId, int nodeOrder, TimeSpan passingTime)
        {
            this.Id = id;
            this.TripId = tripId;
            this.NodeId = nodeId;
            this.NodeOrder = nodeOrder;
            this.PassingTime = passingTime;
        }

    }
}
