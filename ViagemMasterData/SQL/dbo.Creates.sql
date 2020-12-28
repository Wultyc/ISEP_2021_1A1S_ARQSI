CREATE TABLE [dbo].[Vehicle]
(
 [Code] Varchar NOT NULL PRIMARY KEY,
 [LicencePlate] Varchar(10) NOT NULL,
 [VehicleTypeId] Varchar(Max) NOT NULL,
 [Vin] Varchar(17) NOT NULL,
 [StartDate] DateTime NOT NULL
);

CREATE TABLE [dbo].[Trip]
(
 [Id] Varchar NOT NULL PRIMARY KEY,
 [LineId] Varchar(Max) NOT NULL,
 [RouteId] Varchar(Max) NOT NULL,
 [WorkBlockId] Varchar(Max) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
);

CREATE TABLE [dbo].[TripSchedule]
(
 [Id] Varchar NOT NULL PRIMARY KEY,
 [TripId] Varchar(Max) NOT NULL,
 [NodeId] Varchar(Max) NOT NULL,
 [PassingTime] Time NOT NULL
);

CREATE TABLE [dbo].[Tripulant]
(
 [Id] nvarchar(Max) NOT NULL PRIMARY KEY,
 [Name] nvarchar(Max) NOT NULL,
 [BirthDate] DateTime NOT NULL,
 [LicenceNr] nvarchar(10) NOT NULL,
 [LicenceExpires] DateTime NOT NULL
);

CREATE TABLE [dbo].[TripulantTypes]
(
 [Id] nvarchar(Max) NOT NULL PRIMARY KEY,
 [TripulantId] nvarchar(Max) NOT NULL FOREIGN KEY REFERENCES Tripulant(Id),
 [TripulantTypeId] nvarchar(Max) NOT NULL
);

CREATE TABLE [dbo].[WorkBlock]
(
 [Id] Varchar(Max) NOT NULL PRIMARY KEY,
 [VehicleServiceId] Varchar(Max) NOT NULL,
 [TripulantServiceId] Varchar(Max) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
);

CREATE TABLE [dbo].[TripulantService]
(
 [Id] Varchar(Max) NOT NULL PRIMARY KEY,
 [TripulantId] Varchar(Max) NOT NULL
);
 
CREATE TABLE [dbo].[VehicleService]
(
 [Id] Varchar(Max) NOT NULL PRIMARY KEY,
 [VehicleId] Varchar(Max) NOT NULL
);