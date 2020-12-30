using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class WorkBlock
    {
        public string Id { get; set; }
        public string VehicleServiceId { get; set; }
        public string TripulantServiceId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}
