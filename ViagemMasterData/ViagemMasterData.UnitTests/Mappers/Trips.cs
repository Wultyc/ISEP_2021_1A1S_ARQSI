using System;
using Xunit;

using ViagemMasterData.Mappers;
using ViagemMasterData.DTOs.TripDTOs;
using ViagemMasterData.Schema;
using ViagemMasterData.Domain;
using System.Collections.Generic;
using System.Collections;

namespace ViagemMasterData.UnitTests.Mappers
{
    public class Trips
    {
        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetTripDTOForTrip(string id, string lineId, string routeId, TimeSpan startTime, TimeSpan endTime)
        {
            Schema.Trip trip = new Trip(id,lineId,routeId, startTime, endTime);

            TripDTO tripDTO = new TripMapper().GetTripDTOForTrip(trip);

            Assert.Equal(id, tripDTO.Id);
            Assert.Equal(lineId, tripDTO.LineId);
            Assert.Equal(routeId, tripDTO.RouteId);
            Assert.Equal(startTime, tripDTO.StartTime);
            Assert.Equal(endTime, tripDTO.EndTime);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetTripForTripDTO(string id, string lineId, string routeId, TimeSpan startTime, TimeSpan endTime)
        {
            TripDTO tripDTO = new TripDTO(id, lineId, routeId, startTime, endTime);
            Schema.Trip trip = new TripMapper().GetTripForTripDTO(tripDTO);

            Assert.Equal(id, trip.Id);
            Assert.Equal(lineId, trip.LineId);
            Assert.Equal(routeId, trip.RouteId);
            Assert.Equal(startTime, trip.StartTime);
            Assert.Equal(endTime, trip.EndTime);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetTripDTOForCreateTripAdHocDTO(string id, string lineId, string routeId, TimeSpan startTime, TimeSpan endTime)
        {
            CreateTripAdHocDTO trip = new CreateTripAdHocDTO(lineId,routeId,startTime);

            TripDTO tripDTO = new TripMapper().GetTripDTOForCreateTripAdHocDTO(trip);

            Assert.Equal(lineId, tripDTO.LineId);
            Assert.Equal(routeId, tripDTO.RouteId);
            Assert.Equal(startTime, tripDTO.StartTime);
        }

        [Theory]
        [MemberData(nameof(Data))]

        public void TestGetTripDomainForTripDTO(string id, string lineId, string routeId, TimeSpan startTime, TimeSpan endTime)
        {
            TripDTO tripDTO = new TripDTO(id, lineId, routeId, startTime, endTime);
            ViagemMasterData.Domain.Trips.Trip trip = new TripMapper().GetTripDomainForTripDTO(tripDTO);

            Assert.Equal(lineId, trip.LineId);
            Assert.Equal(routeId, trip.RouteId);
            Assert.Equal(startTime, trip.StartTime);
            Assert.Equal(endTime, trip.EndTime);
        }
        public static IEnumerable<object[]> Data =>
        new List<object[]>
        {
            new object[] { new Guid().ToString(), "1", "1", new TimeSpan(1, 2, 3), new TimeSpan(4, 5, 6) },
        };
    }
}
