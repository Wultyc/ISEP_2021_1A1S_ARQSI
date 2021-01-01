using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class TripulantService
    {
        public TripulantService()
        {
            WorkBlocks = new HashSet<WorkBlock>();
        }

        public string Id { get; set; }
        public string TripulantId { get; set; }
        public DateTime Date { get; set; }

        public virtual Tripulant Tripulant { get; set; }
        public virtual ICollection<WorkBlock> WorkBlocks { get; set; }
    }
}
