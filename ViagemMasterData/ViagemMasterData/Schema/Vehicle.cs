using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class Vehicle
    {
        public Vehicle()
        {
            VehicleServices = new HashSet<VehicleService>();
        }

        public string Id { get; set; }
        public string LicencePlate { get; set; }
        public string VehicleTypeId { get; set; }
        public string Vin { get; set; }
        public DateTime StartDate { get; set; }

        public virtual ICollection<VehicleService> VehicleServices { get; set; }
        
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
