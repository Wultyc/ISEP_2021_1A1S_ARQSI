using Newtonsoft.Json;
using System;

namespace ViagemMasterData.Domain.Vehicles
{
    public class VehicleDTO
    {
        public string Id { get; set; }
        public string LicencePlate { get; set; }
        public string Vin { get; set; }
        public string VehicleTypeId { get; set; }
        public DateTime StartDate { get; set; }

        [JsonConstructor]
        public VehicleDTO(string Id, string LicencePlate, string Vin, string VehicleTypeId, DateTime StartDate)
        {
            this.Id = Id;
            this.LicencePlate = LicencePlate;
            this.Vin = Vin;
            this.VehicleTypeId = VehicleTypeId;
            this.StartDate = StartDate;
        }

    }
}
