using Newtonsoft.Json;
using System;

namespace ViagemMasterData.DTOs.WorkBlockDTOs
{
    public class WorkBlockDTO
    {
        public string Id { get; set; }
        public string TripId { get; set; }
        public string VehicleServiceId { get; set; }
        public string TripulantServiceId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        [JsonConstructor]
        public WorkBlockDTO(string id, string tripId, string vehicleServiceId, string tripulantServiceId, TimeSpan startTime, TimeSpan endTime)
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
