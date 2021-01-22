using System;
using ViagemMasterData.Domain.Shared;
using FluentValidation;

namespace ViagemMasterData.Domain.Trips
{
    public class Trip : Entity<TripId>, IAggregateRoot
    {
        public string LineId { get; set; }
        public string RouteId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        private Trip()
        {  
        }

        public Trip(string id, string lineId, string routeId, TimeSpan startTime, TimeSpan endTime)
        {
            this.Id = new TripId(id);
            this.LineId = lineId;
            this.RouteId = routeId;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }

        public void Validate()
        {
            TripValidator validator = new TripValidator();
            validator.ValidateAndThrow(this);
        }

    }
}
