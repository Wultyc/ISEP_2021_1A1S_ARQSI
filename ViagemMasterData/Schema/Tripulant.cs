using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class Tripulant
    {
        public Tripulant()
        {
            TripulantTypes = new HashSet<TripulantType>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string LicenceNr { get; set; }
        public DateTime LicenceExpires { get; set; }

        public virtual ICollection<TripulantType> TripulantTypes { get; set; }
    }
}
