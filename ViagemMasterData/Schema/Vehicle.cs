using System;
using System.Collections.Generic;

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
    }
}
