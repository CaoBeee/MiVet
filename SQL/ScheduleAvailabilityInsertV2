USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ScheduleAvailability_InsertV2]    Script Date: 10/21/2022 3:24:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Brian Cao
-- Create date: 10/14/2022
-- Description: Creating a new record into ScheduleAvailability
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ScheduleAvailability_InsertV2]
												@ScheduleId int
												,@DayOfWeek int
												,@StartTime datetime2(7)
												,@EndTime datetime2(7)
												,@CreatedBy int
												,@ModifiedBy int
												,@IsBooked bit
												,@Id int OUTPUT


as

/*
	Declare @Id int = 0

	Declare @ScheduleId int = 10
			,@DayOfWeek int = 1
			,@StartTime datetime2(7) = '2022-10-14 08:00'
			,@EndTime datetime2(7) = '2022-10-14 09:00'
			,@CreatedBy int = 76
			,@ModifiedBy int = 76
			,@IsBooked bit = 1

	Execute dbo.ScheduleAvailability_InsertV2
											@ScheduleId
											,@DayOfWeek
											,@StartTime
											,@EndTime
											,@CreatedBy
											,@ModifiedBy
											,@IsBooked
											,@Id OUTPUT

	Select @Id

	Select *
	From dbo.scheduleavailabilityv2
														
*/

BEGIN

	INSERT INTO [dbo].[ScheduleAvailabilityV2]
				([ScheduleId]
				,[DayOfWeek]
				,[StartTime]
				,[EndTime]
				,[CreatedBy]
				,[ModifiedBy]
				,[IsBooked])

	VALUES
			(@ScheduleId
			,@DayOfWeek
			,@StartTime
			,@EndTime
			,@CreatedBy
			,@ModifiedBy
			,@IsBooked)

	SET @Id = SCOPE_IDENTITY()

END
GO
