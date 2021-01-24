using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Domain.Vehicles;
using ViagemMasterData.Infrastructure;

namespace ViagemMasterData.Domain.VehicleServices
{
    public class VehicleServices : Entity<VehicleServiceId>, IAggregateRoot
    {
        public VehicleId VehicleId { get; set; }
        public DateTime Date { get; set; }

        private VehicleServices()
        {
        }

        public VehicleServices(string id, string vehicleId, DateTime date)
        {
            if (id != null)
            {
                this.Id = new VehicleServiceId(id);
            }
            else
            {
                this.Id = new VehicleServiceId(Guid.NewGuid().ToString().ToUpper());
            }
            this.VehicleId = new VehicleId(vehicleId);
            this.Date = date;
        }

        public async Task Validate()
        {
            var dbContext = new BaseContext();
            VehicleServiceValidator validator = new VehicleServiceValidator();
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

            var vehicle = dbContext.Vehicles.Where(b => b.Id == this.VehicleId.Value.ToString()).FirstOrDefault();
            if (vehicle == null)
            {
                throw new BusinessRuleValidationException("Vehicle " + this.VehicleId.Value.ToString() + " not found!");
            }
            var vehicleService = dbContext.VehicleServices.Where(b => b.VehicleId == this.VehicleId.Value.ToString() && b.Date == this.Date).FirstOrDefault();
            if (vehicleService != null) {
                throw new BusinessRuleValidationException("Vehicle " + this.VehicleId.Value.ToString() + " already has the day " + this.Date + "assigned!");
            }
        }

    }
}