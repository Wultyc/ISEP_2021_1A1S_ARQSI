using System;
using System.Collections.Generic;
using ViagemMasterData.Domain.Trips;
using ViagemMasterData.DTOs.RedeMasterDataDTOs;

namespace ViagemMasterData.Domain.TripSchedules
{
    public class TripScheduleMapper
    {

        public TripScheduleMapper() { }

        public List<TripScheduleDTO> GetTripScheduleForTripDTOAndRoutDTO(TripDTO tripDTO, RouteDTO routeDTO)
        {
            List<TripScheduleDTO> tripScheduleDTOList = new List<TripScheduleDTO>();
            TimeSpan passingTime = tripDTO.StartTime;

            foreach (RouteNodesDTO routeNodesDTO in routeDTO.routeNodes)
            {
                passingTime.Add(TimeSpan.FromMinutes(routeNodesDTO.duration));
                tripScheduleDTOList.Add(new TripScheduleDTO(Guid.NewGuid().ToString().ToUpper(), tripDTO.Id, routeNodesDTO.nodeId._id, passingTime));
            }

            return tripScheduleDTOList;
        }

        public Schema.TripSchedule GetTripScheduleForTripScheduleDTO(TripScheduleDTO tripScheduleDTO)
        {
            return new Schema.TripSchedule(tripScheduleDTO.Id, tripScheduleDTO.TripId, tripScheduleDTO.NodeId, tripScheduleDTO.PassingTime);
        }
    }
}
