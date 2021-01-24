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
        public Vehicle? Vehicle { get; set; }
        public DateTime Date { get; set; }

        public VehicleServiceDTO(string id, string vehicleId, Vehicle? vehicle, DateTime date)
        {
            this.Id = id;
            this.VehicleId = vehicleId;
            this.Vehicle = vehicle;
            this.Date = date;
        }
    }
}
