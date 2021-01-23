using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class VehicleService
    {
        public string Id { get; set; }
        public string VehicleId { get; set; }
        public DateTime Date { get; set; }

        public virtual Vehicle Vehicle { get; set; }
        public virtual ICollection<WorkBlock> WorkBlocks { get; set; }

        public VehicleService (string id, string vehicleId, DateTime date)
        {
            this.Id = id;
            this.VehicleId = vehicleId;
            this.Date = date;
        }
    }
}
