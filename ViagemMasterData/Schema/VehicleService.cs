using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class VehicleService
    {
        public VehicleService()
        {
            WorkBlocks = new HashSet<WorkBlock>();
        }

        public string Id { get; set; }
        public string VehicleId { get; set; }
        public DateTime Date { get; set; }

        public virtual Vehicle Vehicle { get; set; }
        public virtual ICollection<WorkBlock> WorkBlocks { get; set; }
    }
}
