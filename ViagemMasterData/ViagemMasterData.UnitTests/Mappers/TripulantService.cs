using System;
using Xunit;

using ViagemMasterData.Mappers;
using ViagemMasterData.DTOs.TripulantServiceDTOs;
using ViagemMasterData.Schema;
using ViagemMasterData.Domain;
using System.Collections.Generic;
using System.Collections;


namespace ViagemMasterData.UnitTests.Mappers
{
    public class TripulantService
    {
        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetTripDTOForTrip(string id, string tripulantId, DateTime date)
        {
            Schema.TripulantService tripulantService = new Schema.TripulantService(id, tripulantId, date);
            TripulantServiceDTO tripulantServiceDTO = new TripulantServiceMapper().GetDTOFromSchema(tripulantService);

            Assert.Equal(id, tripulantServiceDTO.Id);
            Assert.Equal(tripulantId, tripulantServiceDTO.TripulantId);
            Assert.Equal(date, tripulantServiceDTO.Date);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetDomainFromTripulantServiceDTO(string id, string tripulantId, DateTime date)
        {
            TripulantServiceDTO tripulantServiceDTO = new TripulantServiceDTO(id, tripulantId, date);
            Domain.TripulantServices.TripulantServices tripulantServices = new TripulantServiceMapper().GetDomainFromTripulantServiceDTO(tripulantServiceDTO);

            Assert.Equal(id, tripulantServices.Id.AsString());
            Assert.Equal(tripulantId, tripulantServices.TripulantId.AsString());
            Assert.Equal(date, tripulantServices.Date);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetSchemaFromDomain(string id, string tripulantId, DateTime date)
        {
            Domain.TripulantServices.TripulantServices tripulantServices = new Domain.TripulantServices.TripulantServices(id, tripulantId, date);
            Schema.TripulantService tripulantService = new TripulantServiceMapper().GetSchemaFromDomain(tripulantServices);

            Assert.Equal(id, tripulantService.Id);
            Assert.Equal(tripulantId, tripulantService.TripulantId);
            Assert.Equal(date, tripulantService.Date);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetDTOFromCreateDTO(string id, string tripulantId, DateTime date)
        {
            CreateTripulantServiceDTO createTripulantServiceDTO = new CreateTripulantServiceDTO(tripulantId, date);
            TripulantServiceDTO tripulantServiceDTO = new TripulantServiceMapper().GetDTOFromCreateDTO(createTripulantServiceDTO);

            Assert.Equal(tripulantId, tripulantServiceDTO.TripulantId);
            Assert.Equal(date, tripulantServiceDTO.Date);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetDTOFromDomain(string id, string tripulantId, DateTime date)
        {
            Domain.TripulantServices.TripulantServices tripulantServices = new Domain.TripulantServices.TripulantServices(id, tripulantId, date);
            TripulantServiceDTO tripulantServiceDTO = new TripulantServiceMapper().GetDTOFromDomain(tripulantServices);

            Assert.Equal(tripulantId, tripulantServiceDTO.TripulantId);
            Assert.Equal(date, tripulantServiceDTO.Date);
        }
        public static IEnumerable<object[]> Data =>
        new List<object[]>
        {
            new object[] { new Guid().ToString(), new Guid().ToString(), new DateTime(2021,01,01) },
        };
    }
}
