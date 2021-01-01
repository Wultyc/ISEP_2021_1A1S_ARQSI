using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Schema;

namespace ViagemMasterData.DTOs.VehicleServiceDTOs
{
    public class VehicleServiceDTO
    {
        public string Id { get; set; }
        public string VehicleId { get; set; }
        public DateTime Date { get; set; }
        public List<WorkBlock> WorkBlocks { get; set; }

        public VehicleServiceDTO(string id, string vehicleId, DateTime date, List<WorkBlock> workBlocks)
        {
            this.Id = id;
            this.VehicleId = vehicleId;
            this.Date = date;
            this.WorkBlocks = workBlocks;
        }
    }
}
