using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ViagemMasterData.DTOs.TripulantDTOs
{
    public class CreateTripulantDTO
    {
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string LicenceNr { get; set; }
        public DateTime LicenceExpires { get; set; }
        public ArrayList TripulantTypes { get; set; }
    }
}
