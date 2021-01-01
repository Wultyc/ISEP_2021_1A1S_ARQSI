using System;
using ViagemMasterData.Domain.Shared;
using FluentValidation;

namespace ViagemMasterData.Domain.TripSchedules
{
    public class TripSchedule : Entity<TripScheduleId>, IAggregateRoot
    {
        public string TripId { get; set; }
        public string NodeId { get; set; }
        public int NodeOrder { get; set; }
        public TimeSpan PassingTime { get; set; }

        private TripSchedule()
        {  
        }

        public TripSchedule(string id, string tripId, string nodeId, int nodeOrder, TimeSpan passingTime)
        {
            this.Id = new TripScheduleId(id);
            this.TripId = tripId;
            this.NodeId = nodeId;
            this.NodeOrder = nodeOrder;
            this.PassingTime = passingTime;
        }

        public void Validate()
        {
            TripScheduleValidator validator = new TripScheduleValidator();
            validator.ValidateAndThrow(this);
        }
    }
}
