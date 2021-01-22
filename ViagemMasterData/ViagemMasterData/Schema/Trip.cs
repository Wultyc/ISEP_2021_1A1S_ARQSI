using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class Trip
    {
        public Trip()
        {
            TripSchedules = new HashSet<TripSchedule>();
            WorkBlockTrips = new HashSet<WorkBlockTrip>();
            WorkBlocks = new HashSet<WorkBlock>();
        }

        public string Id { get; set; }
        public string LineId { get; set; }
        public string RouteId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public virtual ICollection<TripSchedule> TripSchedules { get; set; }
        public virtual ICollection<WorkBlockTrip> WorkBlockTrips { get; set; }
        public virtual ICollection<WorkBlock> WorkBlocks { get; set; }
        public Trip(string id, string lineId, string routeId, TimeSpan startTime, TimeSpan endTime)
        {
            this.Id = id;
            this.LineId = lineId;
            this.RouteId = routeId;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }
    }
}
