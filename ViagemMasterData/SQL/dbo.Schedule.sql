CREATE TABLE [dbo].[Schedule]
(
 [Id] Varchar NOT NULL PRIMARY KEY,
 [Trip] Varchar(Max) NOT NULL,
 [StartTime] Time NOT NULL,
 [EndTime] Time NOT NULL
)

-- Set Id as PK