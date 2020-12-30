using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class Vehicle
    {
        public string Id { get; set; }
        public string LicencePlate { get; set; }
        public string VehicleTypeId { get; set; }
        public string Vin { get; set; }
        public DateTime StartDate { get; set; }

        [JsonConstructor]
        public Vehicle(string Id, string LicencePlate, string Vin, string VehicleTypeId, DateTime StartDate)
        {
            this.Id = Id;
            this.LicencePlate = LicencePlate;
            this.Vin = Vin;
            this.VehicleTypeId = VehicleTypeId;
            this.StartDate = StartDate;
        }
    }  
}
