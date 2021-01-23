using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ViagemMasterData.DTOs.TripulantDTOs
{
    public class TripulantDTO
    {
      
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string LicenceNr { get; set; }
        public DateTime LicenceExpires { get; set; }
        public ArrayList TripulantTypes { get; set; }

        public TripulantDTO(string id, string name, DateTime birthDate, string licenceNr, DateTime licenceExpires, ArrayList tripTypes)
        {
            this.Id = id;
            this.Name = name;
            this.BirthDate = birthDate;
            this.LicenceNr = licenceNr;
            this.LicenceExpires = licenceExpires;
            this.TripulantTypes = tripTypes;
        }
    }
}
