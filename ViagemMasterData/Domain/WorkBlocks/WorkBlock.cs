using System;
using ViagemMasterData.Domain.Shared;
using FluentValidation;

namespace ViagemMasterData.Domain.WorkBlocks
{
    public class WorkBlock : Entity<WorkBlockId>, IAggregateRoot
    {
        public string VehicleServiceId { get; set; }
        public string TripulantServiceId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        private WorkBlock()
        {  
        }

        public WorkBlock(string id, string vehicleServiceId, string tripulantServiceId, TimeSpan startTime, TimeSpan endTime)
        {
            this.Id = new WorkBlockId(id);
            this.VehicleServiceId = vehicleServiceId;
            this.TripulantServiceId = tripulantServiceId;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }

        public void Validate()
        {
            WorkBlockValidator validator = new WorkBlockValidator();
            validator.ValidateAndThrow(this);
        }

    }
}
