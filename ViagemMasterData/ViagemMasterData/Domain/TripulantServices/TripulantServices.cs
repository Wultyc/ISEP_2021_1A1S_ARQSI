using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Domain.Tripulant;
using ViagemMasterData.Infrastructure;

namespace ViagemMasterData.Domain.TripulantServices
{
    public class TripulantServices : Entity<TripulantServiceId>, IAggregateRoot
    {
        public TripulantId TripulantId { get; set; }
        public DateTime Date { get; set; }

        private TripulantServices()
        {
        }

        public TripulantServices(string id, string tripulantId, DateTime date)
        {
            if (id != null)
            {
                this.Id = new TripulantServiceId(id);
            }
            else
            {
                this.Id = new TripulantServiceId(Guid.NewGuid().ToString().ToUpper());
            }
            this.TripulantId = new TripulantId(tripulantId);
            this.Date = date;
        }

        public async Task Validate()
        {
            var dbContext = new BaseContext();
            TripulantServiceValidator validator = new TripulantServiceValidator();
            var validatorMessages = validator.Validate(this);
            if (!validatorMessages.IsValid)
            { 
                string error = "";
                foreach (var failure in validatorMessages.Errors)
                {
                    error = error + " " + failure.ErrorMessage;

                }
                    throw new BusinessRuleValidationException(error);
            }

            var tripulant = dbContext.Tripulants.Where(b => b.Id == this.TripulantId.Value.ToString()).FirstOrDefault();
            if (tripulant == null)
            {
                throw new BusinessRuleValidationException("Tripulant " + this.TripulantId.Value.ToString() + " not found!");
            }
            var vehicleService = dbContext.VehicleServices.Where(b => 
                b.VehicleId == this.TripulantId.Value.ToString() && b.Date == this.Date).FirstOrDefault();
            if (vehicleService != null) {
                throw new BusinessRuleValidationException("Tripulant " + this.TripulantId.Value.ToString() + 
                    " already has the day " + this.Date + "assigned!");
            }
        }

    }
}