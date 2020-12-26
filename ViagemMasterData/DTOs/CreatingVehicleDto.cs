using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDNetCore.DTOs
{
    public class CreatingVehicleDto
    {
        public int Code { get; set; }
        public string Matricula { get; set; }
        public string Vin { get; set; }
        public DateTime DataEntradaServico { get; set; }
    }
}
