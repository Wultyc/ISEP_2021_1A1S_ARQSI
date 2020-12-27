CREATE TABLE [dbo].[Vehicle]
(
 [Code] Varchar NOT NULL PRIMARY KEY,
 [LicencePlate] Varchar(10) NOT NULL,
 [VehicleType] Varchar(Max) NOT NULL,
 [Vin] Varchar(17) NOT NULL,
 [StartDate] DateTime NOT NULL
)

-- Set Code as PK