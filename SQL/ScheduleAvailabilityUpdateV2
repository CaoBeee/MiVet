USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ScheduleAvailability_UpdateV2]    Script Date: 10/21/2022 3:24:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Brian Cao
-- Create date: 10/14/2022
-- Description: Updates a specific record in ScheduleAvailability table with the Id provided
-- Code Reviewer: Ismar Salazar

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ScheduleAvailability_UpdateV2]
												@ScheduleId int
												,@DayOfWeek int
												,@StartTime datetime2(7)
												,@EndTime datetime2(7)
												,@ModifiedBy int
												,@IsBooked bit
												,@Id int OUTPUT

as

/*

	Declare @Id int = 1

	Declare @ScheduleId int = 10
			,@DayOfWeek int = 4
			,@StartTime datetime2(7) = '2022-10-14 08:00'
			,@EndTime datetime2(7) = '2022-10-14 09:00'
			,@ModifiedBy int = 30
			,@IsBooked bit = 1
	
	Select *
	From dbo.ScheduleAvailability
	Where Id = @Id

	Execute dbo.ScheduleAvailability_UpdateV2
											@ScheduleId
											,@DayOfWeek
											,@StartTime
											,@EndTime
											,@ModifiedBy
											,@IsBooked
											,@Id OUTPUT

	Select *
	From dbo.ScheduleAvailability
	Where Id = @Id
														
*/

BEGIN

	UPDATE [dbo].[ScheduleAvailabilityV2]
			SET [ScheduleId] = @ScheduleId
				,[DayOfWeek] = @DayOfWeek
				,[StartTime] = @StartTime
				,[EndTime] = @EndTime
				,[DateModified] = GETUTCDATE()
				,[ModifiedBy] = @ModifiedBy
				,[IsBooked] = @IsBooked
				
				Where Id = @Id

END
GO
