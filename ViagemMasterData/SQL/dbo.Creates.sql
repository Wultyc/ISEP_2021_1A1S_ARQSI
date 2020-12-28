CREATE TABLE [dbo].[Vehicle]
(
 [Code] Varchar NOT NULL PRIMARY KEY,
 [LicencePlate] Varchar(10) NOT NULL,
 [VehicleType] Varchar(Max) NOT NULL,
 [Vin] Varchar(17) NOT NULL,
 [StartDate] DateTime NOT NULL
)

CREATE TABLE [dbo].[Trip]
(
 [Id] Varchar NOT NULL PRIMARY KEY,
 [Line] Varchar(Max) NOT NULL,
 [Route] Varchar(Max) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
)

CREATE TABLE [dbo].[TripSchedule]
(
 [Id] Varchar NOT NULL PRIMARY KEY,
 [Trip] Varchar(Max) NOT NULL,
 [Node] Varchar(Max) NOT NULL,
 [PassingTime] Time NOT NULL
)

CREATE TABLE [dbo].[Tripulant]
(
 [Id] nvarchar(Max) NOT NULL PRIMARY KEY,
 [Name] nvarchar(Max) NOT NULL,
 [BirthDate] DateTime NOT NULL,
 [LicenceNr] nvarchar(Max) NOT NULL,
 [LicenceExpires] DateTime NOT NULL
);

CREATE TABLE [dbo].[TripulantTypes]
(
 [Id] nvarchar(Max) NOT NULL PRIMARY KEY,
 [IdTripulant] nvarchar(Max) NOT NULL FOREIGN KEY REFERENCES Tripulant(Id),
 [IdTripulantType] nvarchar(Max) NOT NULL
);