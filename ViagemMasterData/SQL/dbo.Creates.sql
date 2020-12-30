drop table [dbo].[TripSchedule]
drop table [dbo].[Trip]
drop table [dbo].[Workblock]
drop table [dbo].[TripulantService]
drop table [dbo].[VehicleService]
drop table [dbo].[TripulantTypes]
drop table [dbo].[Tripulant]
drop table [dbo].[Vehicle]


CREATE TABLE [dbo].[Vehicle]
(
 [Id] char(255) NOT NULL PRIMARY KEY,
 [LicencePlate] Varchar(10) NOT NULL,
 [VehicleTypeId] char(255) NOT NULL,
 [Vin] Varchar(17) NOT NULL,
 [StartDate] DateTime NOT NULL
);

CREATE TABLE [dbo].[Trip]
(
 [Id] char(255) NOT NULL PRIMARY KEY,
 [LineId] char(255) NOT NULL,
 [RouteId] char(255) NOT NULL,
 [WorkBlockId] char(255) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
);

CREATE TABLE [dbo].[TripSchedule]
(
 [Id] char(255) NOT NULL PRIMARY KEY,
 [TripId] char(255) NOT NULL,
 [NodeId] char(255) NOT NULL,
 [PassingTime] Time NOT NULL
);

CREATE TABLE [dbo].[Tripulant]
(
 [Id] char(255) NOT NULL PRIMARY KEY,
 [Name] nvarchar(Max) NOT NULL,
 [BirthDate] DateTime NOT NULL,
 [LicenceNr] nvarchar(10) NOT NULL,
 [LicenceExpires] DateTime NOT NULL
);

CREATE TABLE [dbo].[TripulantTypes]
(
 [Id] char(255) NOT NULL PRIMARY KEY,
 [TripulantId] char(255) NOT NULL FOREIGN KEY REFERENCES Tripulant(Id),
 [TripulantTypeId] char(255) NOT NULL
);

CREATE TABLE [dbo].[WorkBlock]
(
 [Id] char(255) NOT NULL PRIMARY KEY,
 [VehicleServiceId] char(255) NOT NULL,
 [TripulantServiceId] char(255) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
);

CREATE TABLE [dbo].[TripulantService]
(
 [Id] char(255) NOT NULL PRIMARY KEY,
 [TripulantId] char(255) NOT NULL,
 [Date] DateTime NOT NULL
);
 
CREATE TABLE [dbo].[VehicleService]
(
 [Id] char(255) NOT NULL PRIMARY KEY,
 [VehicleId] char(255) NOT NULL,
 [Date] DateTime NOT NULL
);