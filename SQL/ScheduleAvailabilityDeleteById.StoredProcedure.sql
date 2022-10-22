USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ScheduleAvailability_Delete_ByIdV2]    Script Date: 10/21/2022 3:24:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Brian Cao
-- Create date: 10/14/2022
-- Description: Deleting ScheduleAvailability By Id
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[ScheduleAvailability_Delete_ByIdV2]
													@Id int

as

/*

	Declare @Id int = 1;

	Select *
	From dbo.ScheduleAvailabilityV2
	Where Id = @Id;

	Execute dbo.ScheduleAvailability_Delete_ByIdV2 @Id

	Select *
	From dbo.ScheduleAvailabilityV2
	Where Id = @Id;

*/

BEGIN

	DELETE FROM [dbo].[ScheduleAvailabilityV2]
	WHERE Id = @Id;

END
GO
