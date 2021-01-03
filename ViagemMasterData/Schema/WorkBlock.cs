using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class WorkBlock
    {
        public WorkBlock()
        {
            WorkBlockTrips = new HashSet<WorkBlockTrip>();
        }

        public string Id { get; set; }
        public string TripId { get; set; }
        public string VehicleServiceId { get; set; }
        public string TripulantServiceId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public virtual Trip Trip { get; set; }
        public virtual TripulantService TripulantService { get; set; }
        public virtual VehicleService VehicleService { get; set; }
        public virtual ICollection<WorkBlockTrip> WorkBlockTrips { get; set; }

        public WorkBlock(string id, string tripId, string vehicleServiceId, string tripulantServiceId, TimeSpan startTime, TimeSpan endTime)
        {
            this.Id = id;
            this.TripId = tripId;
            this.VehicleServiceId = vehicleServiceId;
            this.TripulantServiceId = tripulantServiceId;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }
    }
}
