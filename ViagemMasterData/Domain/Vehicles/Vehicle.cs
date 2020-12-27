using System;
using ViagemMasterData.Domain.Shared;

namespace ViagemMasterData.Domain.Vehicles
{
    public class Vehicle : Entity<VehicleId>, IAggregateRoot
    {
        public string LicencePlate { get; set; }
        public string Vin { get; set; }
        public string VehicleType { get; set; }
        public DateTime StartDate { get; set; }

        private Vehicle()
        {  
        }

        public Vehicle(string id, string licencePlate, string vin, string vehicleType, DateTime startDate)
        {
            this.Id = new VehicleId(id);
            this.LicencePlate = licencePlate;
            this.Vin = vin;
            this.VehicleType = vehicleType;
            this.StartDate = startDate;
        }

    }
}
