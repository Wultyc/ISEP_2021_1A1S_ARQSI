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
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [LicencePlate] Varchar(10) NOT NULL,
 [VehicleTypeId] varchar(255) NOT NULL,
 [Vin] Varchar(17) NOT NULL,
 [StartDate] DateTime NOT NULL
);

CREATE TABLE [dbo].[Trip]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [LineId] varchar(255) NOT NULL,
 [RouteId] varchar(255) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
);

CREATE TABLE [dbo].[TripSchedule]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [TripId] varchar(255) NOT NULL,
 [NodeId] varchar(255) NOT NULL,
 [NodeOrder] int NOT NULL,
 [PassingTime] Time NOT NULL
);

CREATE TABLE [dbo].[Tripulant]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [Name] nvarchar(Max) NOT NULL,
 [BirthDate] DateTime NOT NULL,
 [LicenceNr] nvarchar(10) NOT NULL,
 [LicenceExpires] DateTime NOT NULL
);

CREATE TABLE [dbo].[TripulantTypes]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [TripulantId] varchar(255) NOT NULL FOREIGN KEY REFERENCES Tripulant(Id),
 [TripulantTypeId] varchar(255) NOT NULL
);

CREATE TABLE [dbo].[WorkBlock]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [TripId] varchar(255) NOT NULL,
 [VehicleServiceId] varchar(255) NOT NULL,
 [TripulantServiceId] varchar(255) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
);

CREATE TABLE [dbo].[TripulantService]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [TripulantId] varchar(255) NOT NULL,
 [Date] DateTime NOT NULL
);
 
CREATE TABLE [dbo].[VehicleService]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [VehicleId] varchar(255) NOT NULL,
 [Date] DateTime NOT NULL
);