using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class TripulantType
    {
        public string Id { get; set; }
        public string TripulantId { get; set; }
        public string TripulantTypeId { get; set; }
        public virtual Tripulant Tripulant { get; set; }
    }
}
