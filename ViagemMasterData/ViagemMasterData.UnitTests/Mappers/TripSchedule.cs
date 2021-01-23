using System;
using Xunit;

using ViagemMasterData.Mappers;
using ViagemMasterData.DTOs.TripScheduleDTOs;
using ViagemMasterData.Schema;
using ViagemMasterData.Domain;
using System.Collections.Generic;
using System.Collections;


namespace ViagemMasterData.UnitTests.Mappers
{
    public class TripSchedule
    {
        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetTripScheduleForTripScheduleDTO(string id, string tripId, string nodeId, int nodeOrder, TimeSpan passingTime)
        {
            TripScheduleDTO tripScheduleDTO = new TripScheduleDTO(id, tripId, nodeId, nodeOrder, passingTime);
            Schema.TripSchedule tripSchedule = new TripScheduleMapper().GetTripScheduleForTripScheduleDTO(tripScheduleDTO);

            Assert.Equal(id, tripSchedule.Id);
            Assert.Equal(tripId, tripSchedule.TripId);
            Assert.Equal(nodeId, tripSchedule.NodeId);
            Assert.Equal(passingTime, tripSchedule.PassingTime);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetTripScheduleDomainForTripScheduleDTO(string id, string tripId, string nodeId, int nodeOrder, TimeSpan passingTime)
        {
            TripScheduleDTO tripScheduleDTO = new TripScheduleDTO(id, tripId, nodeId, nodeOrder, passingTime);
            Domain.TripSchedules.TripSchedule tripSchedule = new TripScheduleMapper().GetTripScheduleDomainForTripScheduleDTO(tripScheduleDTO);

            Assert.Equal(tripId, tripSchedule.TripId);
            Assert.Equal(nodeId, tripSchedule.NodeId);
            Assert.Equal(passingTime, tripSchedule.PassingTime);
        }

        public static IEnumerable<object[]> Data =>
        new List<object[]>
        {
            new object[] { new Guid().ToString(), new Guid().ToString(), "nodeX", "1", new TimeSpan(1,30,00) },
        };
    }
}
