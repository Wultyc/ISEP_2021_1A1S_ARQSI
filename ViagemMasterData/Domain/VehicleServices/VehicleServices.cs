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

        public async Task Validate(VehicleServices vehicleServices)
        {
            var dbContext = new BaseContext();
            VehicleServiceValidator validator = new VehicleServiceValidator();
            validator.ValidateAndThrow(vehicleServices);

            var vehicle = dbContext.Vehicles.Where(b => b.Id == vehicleServices.VehicleId.Value.ToString()).FirstOrDefault();
            if (vehicle == null)
            {
                throw new BusinessRuleValidationException("Vehicle " + vehicleServices.VehicleId.Value.ToString() + " not found!");
            }
        }

    }
}