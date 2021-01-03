using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class WorkBlockTrip
    {
        public string TripId { get; set; }
        public string WorkBlockId { get; set; }
        public virtual Trip Trip { get; set; }
        public virtual WorkBlock WorkBlock { get; set; }
    }
}
