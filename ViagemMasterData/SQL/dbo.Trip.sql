CREATE TABLE [dbo].[Trip]
(
 [Id] Varchar NOT NULL PRIMARY KEY,
 [Line] Varchar(Max) NOT NULL,
 [Route] Varchar(Max) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
)

-- Set Id as PK