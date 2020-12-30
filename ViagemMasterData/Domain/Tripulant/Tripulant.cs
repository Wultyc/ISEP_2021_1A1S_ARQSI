using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;

namespace ViagemMasterData.Domain.Tripulant
{
    public class Tripulant : Entity<TripulantId>, IAggregateRoot
    {
        public TripulantId Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string LicenceNr { get; set; }
        public DateTime LicenceExpires { get; set; }

        private Tripulant()
        {
        }
        public TripulantId tripulantId
        { get; set; }

        public Tripulant(string id, string name, DateTime birthDate, string lincenceNr, DateTime licenceExpires)
        {   
            if (id != null)
            {
                this.Id = new TripulantId(id);
            }
            else
            {
                this.Id = new TripulantId(Guid.NewGuid().ToString().ToUpper());
            }
            this.Name = name;
            this.BirthDate = birthDate;
            this.LicenceNr = lincenceNr;
            this.LicenceExpires = licenceExpires;
        }

    }
}
