using System;
using System.Collections.Generic;
using ViagemMasterData.Domain.Trips;
using ViagemMasterData.Domain.TripSchedules;
using ViagemMasterData.DTOs.TripScheduleDTOs;
using ViagemMasterData.DTOs.TripDTOs;
using ViagemMasterData.DTOs.RedeMasterDataDTOs;

namespace ViagemMasterData.Mappers
{
    public class TripScheduleMapper
    {

        public TripScheduleMapper() { }

        public List<TripScheduleDTO> GetTripScheduleForTripDTOAndRoutDTO(TripDTO tripDTO, RouteDTO routeDTO)
        {
            List<TripScheduleDTO> tripScheduleDTOList = new List<TripScheduleDTO>();
            int order = 0;
            TimeSpan passingTime = tripDTO.StartTime;

            foreach (RouteNodesDTO routeNodesDTO in routeDTO.routeNodes)
            {
                order += 1;
                passingTime = passingTime.Add(TimeSpan.FromMinutes(routeNodesDTO.duration));
                tripScheduleDTOList.Add(new TripScheduleDTO(Guid.NewGuid().ToString().ToUpper(), tripDTO.Id, routeNodesDTO.nodeId._id, order, passingTime));
            }

            return tripScheduleDTOList;
        }

        public Schema.TripSchedule GetTripScheduleForTripScheduleDTO(TripScheduleDTO tripScheduleDTO)
        {
            return new Schema.TripSchedule(tripScheduleDTO.Id, tripScheduleDTO.TripId, tripScheduleDTO.NodeId, 
                tripScheduleDTO.NodeOrder, tripScheduleDTO.PassingTime);
        }

        public TripSchedule GetTripScheduleDomainForTripScheduleDTO(TripScheduleDTO tripScheduleDTO)
        {
            return new TripSchedule(tripScheduleDTO.Id, tripScheduleDTO.TripId, tripScheduleDTO.NodeId,
                tripScheduleDTO.NodeOrder, tripScheduleDTO.PassingTime);
        }
    }
}
