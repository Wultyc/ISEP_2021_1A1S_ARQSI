drop table [dbo].[WorkBlockTrip]
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
 [TripId] varchar(255) NOT NULL REFERENCES Trip(Id),
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
 [TripulantId] varchar(255) NOT NULL REFERENCES Tripulant(Id),
 [TripulantTypeId] varchar(255) NOT NULL
);

CREATE TABLE [dbo].[TripulantService]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [TripulantId] varchar(255) NOT NULL REFERENCES Tripulant(Id),
 [Date] DateTime NOT NULL
);
 
CREATE TABLE [dbo].[VehicleService]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [VehicleId] varchar(255) NOT NULL REFERENCES Vehicle(Id),
 [Date] DateTime NOT NULL
);

CREATE TABLE [dbo].[WorkBlock]
(
 [Id] varchar(255) NOT NULL PRIMARY KEY,
 [TripId] varchar(255) NOT NULL REFERENCES Trip(Id),
 [VehicleServiceId] varchar(255) NOT NULL REFERENCES VehicleService(Id),
 [TripulantServiceId] varchar(255) NOT NULL REFERENCES TripulantService(Id),
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
);

CREATE TABLE [dbo].[WorkBlockTrip]
(
 [TripId] varchar(255) NOT NULL REFERENCES Trip(Id),
 [WorkBlockId] varchar(255) NOT NULL REFERENCES WorkBlock(Id),
 CONSTRAINT PK_WorkBlockTrip PRIMARY KEY (TripId,WorkBlockId)
);