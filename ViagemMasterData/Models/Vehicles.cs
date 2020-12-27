using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDNetCore.Models
{
    public class Vehicles
    {
        //matricula, VIN, pelo seu tipo e data de entrada ao serviço
        public string Code { get; set; }
        public string LicencePlate { get; set; }
        public string Vin { get; set; }
        public string VehicleType { get; set; }
        public DateTime StartDate { get; set; }
    }
}
