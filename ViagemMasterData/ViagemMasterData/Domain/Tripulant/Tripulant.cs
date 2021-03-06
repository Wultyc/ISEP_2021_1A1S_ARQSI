using FluentValidation;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Infraestructure;

namespace ViagemMasterData.Domain.Tripulant
{
    public class Tripulant : Entity<TripulantId>, IAggregateRoot
    {
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string LicenceNr { get; set; }
        public DateTime LicenceExpires { get; set; }
        public ArrayList TripulantTypes { get; set; }

        private readonly HttpRequests request = new HttpRequests();

        private Tripulant()
        {
        }

        public Tripulant(string id, string name, DateTime birthDate, string lincenceNr, DateTime licenceExpires, ArrayList tripulantId) 

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
            this.TripulantTypes = tripulantId;
            //foreach (string element in tripulantId)
            //{
            //    this.TripulantTypes.Add(element);
            //}
        }

        public async Task Validate(Tripulant tripulant)
        {
            TripulantValidator validator = new TripulantValidator();
            validator.ValidateAndThrow(tripulant);

            foreach (string tripulantType in tripulant.TripulantTypes)
            {
                bool validateTripulantType = await request.CheckEntityForIdAsync("tripulant-types", tripulantType);

                if (!validateTripulantType)
                {
                    throw new BusinessRuleValidationException("Tripulant-Type " + tripulantType + " not found!");
                }
            }

        }

    }
}
