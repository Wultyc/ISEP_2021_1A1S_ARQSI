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
        public TimeSpan PassingTime { get; set; }
    }
}
