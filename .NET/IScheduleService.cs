using Sabio.Models;
using Sabio.Models.Requests.Schedules;
using Sabio.Models.Domain.Schedules;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IScheduleService
    {
        #region -- Availability

        ScheduleAvailability GetAvailabilityById(int id);
        List<ScheduleAvailability> GetAllAvailability(int vetProfileId);
        List<ScheduleAvailabilityV2> GetAllAvailabilityByVet(int vetProfileId);
        List<ScheduleAvailability> GetAvailabilityByScheduleId(int scheduleId);
        List<ScheduleAvailability> GetAvailabilityByCreatedBy(int createdBy);
        public int AddAvailability(ScheduleAvailabilityAddRequest model, int createdBy);
        public int AddAvailabilityV2(ScheduleAvailabilityAddRequestV2 model, int createdBy);
        public void UpdateAvailability(ScheduleAvailabilityUpdateRequest model, int modifiedBy);
        public void UpdateAvailabilityV2(ScheduleAvailabilityUpdateRequestV2 model, int modifiedBy);
        public void DeleteAvailabilityById(int id);
        public void DeleteAvailabilityByIdV2(int id);

        #endregion
    }
}
