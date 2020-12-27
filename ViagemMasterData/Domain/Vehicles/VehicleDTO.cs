using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public VehicleDTO(CreateVehicleDTO createVehicleDTO)
        {
            this.Code = null;
            this.LicencePlate = createVehicleDTO.LicencePlate;
            this.Vin = createVehicleDTO.Vin;
            this.VehicleType = createVehicleDTO.VehicleType;
            this.StartDate = createVehicleDTO.StartDate;
        }

        public VehicleDTO(Vehicle vehicle)
        {
            this.Code = vehicle.Id.Value.ToString().ToUpper();
            this.LicencePlate = vehicle.LicencePlate;
            this.Vin = vehicle.Vin;
            this.VehicleType = vehicle.VehicleType;
            this.StartDate = vehicle.StartDate;
        }

        public Vehicle ToVehicle()
        {
            return new Vehicle(this.Code, this.LicencePlate, this.Vin, this.VehicleType, this.StartDate);
        }
    }
}
