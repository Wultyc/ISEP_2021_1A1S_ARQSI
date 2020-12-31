using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ViagemMasterData.DTOs.VehicleDTOs
{
    public class CreateVehicleDTO
    {
        public string LicencePlate { get; set; }
        public string Vin { get; set; }
        public string VehicleTypeId { get; set; }
        public DateTime StartDate { get; set; }

        [JsonConstructor]
        public CreateVehicleDTO(string LicencePlate, string Vin, string VehicleTypeId, DateTime StartDate)
        {
            this.LicencePlate = LicencePlate;
            this.Vin = Vin;
            this.VehicleTypeId = VehicleTypeId;
            this.StartDate = StartDate;
        }
    }
}
