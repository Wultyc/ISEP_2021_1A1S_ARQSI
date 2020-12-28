using Newtonsoft.Json;
using System;

namespace ViagemMasterData.Domain.Vehicles
{
    public class VehicleDTO
    {
        public string Code { get; set; }
        public string LicencePlate { get; set; }
        public string Vin { get; set; }
        public string VehicleType { get; set; }
        public DateTime StartDate { get; set; }

        [JsonConstructor]
        public VehicleDTO(string Code, string LicencePlate, string Vin, string VehicleType, DateTime StartDate)
        {
            this.Code = Code;
            this.LicencePlate = LicencePlate;
            this.Vin = Vin;
            this.VehicleType = VehicleType;
            this.StartDate = StartDate;
        }

    }
}
