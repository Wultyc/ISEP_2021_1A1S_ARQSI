using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ViagemMasterData.Domain.Vehicles
{
    public class CreateVehicleDTO
    {
        public string LicencePlate { get; set; }
        public string Vin { get; set; }
        public string VehicleType { get; set; }
        public DateTime StartDate { get; set; }

        public CreateVehicleDTO(string LicencePlate, string Vin, string VehicleType, DateTime StartDate)
        {
            this.LicencePlate = LicencePlate;
            this.Vin = Vin;
            this.VehicleType = VehicleType;
            this.StartDate = StartDate;
        }
    }
}
