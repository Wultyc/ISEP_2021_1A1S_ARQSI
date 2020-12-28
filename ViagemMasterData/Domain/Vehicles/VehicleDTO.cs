using Newtonsoft.Json;
using System;

namespace ViagemMasterData.Domain.Vehicles
{
    public class VehicleDTO
    {
        public string Code { get; set; }
        public string LicencePlate { get; set; }
        public string Vin { get; set; }
        public string VehicleTypeId { get; set; }
        public DateTime StartDate { get; set; }

        [JsonConstructor]
        public VehicleDTO(string Code, string LicencePlate, string Vin, string VehicleTypeId, DateTime StartDate)
        {
            this.Code = Code;
            this.LicencePlate = LicencePlate;
            this.Vin = Vin;
            this.VehicleTypeId = VehicleTypeId;
            this.StartDate = StartDate;
        }

    }
}
