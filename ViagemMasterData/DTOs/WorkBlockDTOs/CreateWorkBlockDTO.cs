using Newtonsoft.Json;
using System;

namespace ViagemMasterData.DTOs.WorkBlockDTOs
{
    public class CreateWorkBlockDTO
    {
        public string TripId { get; set; }
        public string VehicleServiceId { get; set; }
        public TimeSpan StartTime { get; set; }
        public int Frequency { get; set; }
        public int NumberOfWorkBlocks { get; set; }

        [JsonConstructor]
        public CreateWorkBlockDTO(string tripId, string vehicleServiceId, TimeSpan startTime, int frequency, int numberOfWorkBlocks)
        {
            this.TripId = tripId;
            this.VehicleServiceId = vehicleServiceId;
            this.StartTime = startTime;
            this.Frequency = frequency;
            this.NumberOfWorkBlocks = numberOfWorkBlocks;
        }

    }
}
