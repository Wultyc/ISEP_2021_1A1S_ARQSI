using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class Tripulant
    {
        public Tripulant()
        {
            TripulantServices = new HashSet<TripulantService>();
            TripulantTypes = new HashSet<TripulantType>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string LicenceNr { get; set; }
        public DateTime LicenceExpires { get; set; }

        public virtual ICollection<TripulantService> TripulantServices { get; set; }
        public virtual ICollection<TripulantType> TripulantTypes { get; set; }
        //[JsonConstructor]
        public Tripulant(string id, string name, DateTime birthDate, string licenceNr, DateTime licenceExpires)
        {
            this.Id = id;
            this.Name = name;
            this.BirthDate = birthDate;
            this.LicenceNr = licenceNr;
            this.LicenceExpires = licenceExpires;
        }
    }
}
