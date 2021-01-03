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
        
        public TripulantType (string id, string tripulantId, string tripulantTypeId)
        {
            this.Id = id;
            this.TripulantId = tripulantId;
            this.TripulantTypeId = tripulantTypeId;
        }
    }
}
