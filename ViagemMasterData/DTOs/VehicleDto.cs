using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDNetCore.DTOs
{
    public class VehicleDto
    {
        public string Code { get; set; }
        public string LicencePlate { get; set; }
        public string Vin { get; set; }
        public string VehicleType { get; set; }
        public DateTime StartDate { get; set; }
    }
}
