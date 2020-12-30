using System;
using System.Collections.Generic;

#nullable disable

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
    }
}
