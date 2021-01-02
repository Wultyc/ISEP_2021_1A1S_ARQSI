using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ViagemMasterData.DTOs.VehicleServiceDTOs
{
    public class CreateVehicleServiceDTO
    {

        public string VehicleId { get; set; }
        public DateTime Date { get; set; }

        public CreateVehicleServiceDTO(string vehicleId, DateTime date)
        {
            this.VehicleId = vehicleId;
            this.Date = date;
        }
    }
}
