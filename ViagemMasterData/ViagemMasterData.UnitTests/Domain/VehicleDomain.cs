using System;
using Xunit;
using System.Linq;
using ViagemMasterData.Mappers;
using ViagemMasterData.Schema;
using ViagemMasterData.Domain;
using System.Collections.Generic;
using System.Collections;
using ViagemMasterData.Domain.Shared;

namespace ViagemMasterData.UnitTests.Domain
{
    public class VehicleDomain
    {
        [Theory]
        [MemberData(nameof(Data))]
        public void TestVehicleDomain(string id, string plate, string vin, string vType, DateTime startDate)
        {
            string message = "";
            ViagemMasterData.Domain.Vehicles.Vehicle vehDomain = new ViagemMasterData.Domain.Vehicles.Vehicle(id, null, vin, vType, startDate);
            try
            {
                vehDomain.Validate();
            }
            catch (FluentValidation.ValidationException ex)
            {
                message = ex.Errors.ToList()[0].ErrorMessage;
            }
                Assert.Equal("Is necessary to inform the licence plate.", message);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestDomainVin(string id, string plate, string vin, string vType, DateTime startDate)
        {
            string message = "";
            ViagemMasterData.Domain.Vehicles.Vehicle vehDomain = new ViagemMasterData.Domain.Vehicles.Vehicle(id, plate, null, vType, startDate);
            try
            {
                vehDomain.Validate();
            }
            catch (FluentValidation.ValidationException ex)
            {
                message = ex.Errors.ToList()[0].ErrorMessage;
            }
            Assert.Equal("Is necessary to inform the vin.", message);
        }

        [Theory]
        [MemberData(nameof(Data))]
        public void TestAproveVehicleDomain(string id, string plate, string vin, string vType, DateTime startDate)
        {
            FluentValidation.ValidationException message = null;
            ViagemMasterData.Domain.Vehicles.Vehicle vehDomain = new ViagemMasterData.Domain.Vehicles.Vehicle(id, plate, vin, vType, startDate);
            try
            {
                vehDomain.Validate();
            }
            catch (FluentValidation.ValidationException ex)
            {
               message = ex;
            }
            Assert.Null(message);
        }
        public static IEnumerable<object[]> Data =>
          new List<object[]>
          {
            new object[] { new Guid().ToString(),"licence plate", "vin", "idtipe", new DateTime(1, 2, 3)},
          };

    }
                //.NotNull().WithMessage("Is necessary to inform the code.");
                //.NotNull().WithMessage("Is necessary to inform the licence plate.");
                //.NotNull().WithMessage("Is necessary to inform the vin.");
                //.NotNull().WithMessage("Is necessary to inform the vehicle type.");
                //.NotEmpty().WithMessage("Is necessary to inform the start date.")
}
