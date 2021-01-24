using System;
using Xunit;

using ViagemMasterData.Mappers;
using ViagemMasterData.DTOs.TripulantDTOs;
using ViagemMasterData.Schema;
using ViagemMasterData.Domain;
using System.Collections.Generic;
using System.Collections;

namespace ViagemMasterData.UnitTests.Mappers
{
    public class Tripulant
    {
        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetTripulantDTOForTripulant(string id, string name, DateTime bithDate, string licenceNr, DateTime licenceExpires, ArrayList TripTypes)
        {
            Schema.Tripulant tripulant = new Schema.Tripulant(id,name,bithDate,licenceNr,licenceExpires);
            TripulantDTO tripulantDTO = new TripulantMapper().GetTripulantDTOForTripulant(tripulant);

            Assert.Equal(id, tripulantDTO.Id);
            Assert.Equal(name, tripulantDTO.Name);
            Assert.Equal(bithDate, tripulantDTO.BirthDate);
            Assert.Equal(licenceNr, tripulantDTO.LicenceNr);
            Assert.Equal(licenceExpires, tripulantDTO.LicenceExpires);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetDomainFromTripulantDTO(string id, string name, DateTime bithDate, string licenceNr, DateTime licenceExpires, ArrayList tripTypes)
        {
            TripulantDTO tripulantDTO = new TripulantDTO(id, name, bithDate, licenceNr, licenceExpires, tripTypes);
            ViagemMasterData.Domain.Tripulant.Tripulant tripulant = new TripulantMapper().GetDomainFromTripulantDTO(tripulantDTO);

            Assert.Equal(id, tripulantDTO.Id);
            Assert.Equal(name, tripulantDTO.Name);
            Assert.Equal(bithDate, tripulantDTO.BirthDate);
            Assert.Equal(licenceNr, tripulantDTO.LicenceNr);
            Assert.Equal(licenceExpires, tripulantDTO.LicenceExpires);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestGetSchemaFromDomain(string id, string name, DateTime bithDate, string licenceNr, DateTime licenceExpires, ArrayList tripTypes)
        {
            ViagemMasterData.Domain.Tripulant.Tripulant domainTripulant = new ViagemMasterData.Domain.Tripulant.Tripulant(id, name, bithDate, licenceNr, licenceExpires, tripTypes);
            Schema.Tripulant tripulant = new TripulantMapper().GetSchemaFromDomain(domainTripulant);

            Assert.Equal(name, tripulant.Name);
            Assert.Equal(bithDate, tripulant.BirthDate);
            Assert.Equal(licenceNr, tripulant.LicenceNr);
            Assert.Equal(licenceExpires, tripulant.LicenceExpires);
        }

        [Theory]
        [MemberData(nameof(Data))]

        public void TestGetTripulantDTOForCreateTripulantDTO(string id, string name, DateTime bithDate, string licenceNr, DateTime licenceExpires, ArrayList tripTypes)
        {
            CreateTripulantDTO tripCreateDTO = new CreateTripulantDTO();
            tripCreateDTO.Name = name;
            tripCreateDTO.BirthDate = bithDate;
            tripCreateDTO.LicenceNr = licenceNr;
            tripCreateDTO.LicenceExpires = licenceExpires;
            tripCreateDTO.TripulantTypes = tripTypes;
            TripulantDTO tripulantDTO = new TripulantMapper().GetTripulantDTOForCreateTripulantDTO(tripCreateDTO);

            Assert.Equal(name, tripulantDTO.Name);
            Assert.Equal(bithDate, tripulantDTO.BirthDate);
            Assert.Equal(licenceNr, tripulantDTO.LicenceNr);
            Assert.Equal(licenceExpires, tripulantDTO.LicenceExpires);
        }
        public static IEnumerable<object[]> Data =>
        new List<object[]>
        {
            new object[] { new Guid().ToString(), "Jonh Doe", new DateTime(1997,09,05), "123456789", new DateTime(2030,09,05), new ArrayList() },
        };
    }
}
