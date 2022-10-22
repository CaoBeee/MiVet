USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ScheduleAvailability_SelectByVetProfileId]    Script Date: 10/21/2022 3:24:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Brian Cao
-- Create date: 10/14/2022
-- Description: Selecting All ScheduleAvailability by Vet profile ID
-- Code Reviewer: Ismar Salazar

-- MODIFIED BY: Brian Cao
-- MODIFIED DATE:10/14/2022
-- Code Reviewer:
-- Note: 
-- =============================================
CREATE proc [dbo].[ScheduleAvailability_SelectByVetProfileId]
													@VetProfileId int
													

as

/*
	Declare @VetProfileId int = 4
	Execute dbo.ScheduleAvailability_SelectByVetProfileId
												@VetProfileId
					

*/

BEGIN

	Select sa.Id
			,sa.ScheduleId
			,d.Id
			,d.[Name]
			,sa.StartTime
			,sa.EndTime
			,sa.DateCreated
			,sa.DateModified
			,sa.IsBooked

	From dbo.ScheduleAvailabilityV2 as sa 
	inner join dbo.DaysOfWeek as d
	on sa.DayOfWeek = d.Id
	inner join dbo.Schedules as s
	on sa.ScheduleId = s.Id
	Where s.VetProfileId = @VetProfileId

	ORDER BY sa.Id

END
GO
