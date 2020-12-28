CREATE TABLE [dbo].[Trip]
(
 [Id] Varchar NOT NULL PRIMARY KEY,
 [Line] Varchar(Max) NOT NULL,
 [Route] Varchar(Max) NOT NULL,
 [StartHour] Time NOT NULL
)

-- Set Id as PK