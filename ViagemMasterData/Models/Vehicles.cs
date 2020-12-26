using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDNetCore.Models
{
    public class Vehicles
    {
        //matricula, VIN, pelo seu tipo e data de entrada ao serviço
        public int Code { get; set; }
        public string Matricula { get; set; }
        public string Vin { get; set; }
        public DateTime DataEntradaServico { get; set; }
    }
}
