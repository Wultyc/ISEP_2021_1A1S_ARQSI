using System;
using ViagemMasterData.Domain.Shared;

namespace ViagemMasterData.Domain.TripSchedules
{
    public class TripSchedule : Entity<TripScheduleId>, IAggregateRoot
    {
        public string TripId { get; set; }
        public string NodeId { get; set; }
        public TimeSpan PassingTime { get; set; }

        private TripSchedule()
        {  
        }

        public TripSchedule(string id, string tripId, string nodeId, TimeSpan passingTime)
        {
            this.Id = new TripScheduleId(id);
            this.TripId = tripId;
            this.NodeId = nodeId;
            this.PassingTime = passingTime;
        }

    }
}
