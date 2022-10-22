using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System.Data.SqlClient;
using System;
using Sabio.Models.Domain.Schedules;
using Sabio.Services.Interfaces;
using Sabio.Models.Requests.Schedules;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/schedules")]
    [ApiController]
    public class ScheduleApiController : BaseApiController
    {
        private IScheduleService _service = null;
        private IAuthenticationService<int> _authService = null;
        public ScheduleApiController(IScheduleService service
            , ILogger<ScheduleApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("availability/{id:int}")]
        public ActionResult<ItemResponse<ScheduleAvailability>> GetAvailabilityById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                ScheduleAvailability sched = _service.GetAvailabilityById(id);

                if (sched == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<ScheduleAvailability> { Item = sched };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("availability/vet/{id:int}")]
        public ActionResult<ItemsResponse<ScheduleAvailability>> GetAllAvailability(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<ScheduleAvailability> list = _service.GetAllAvailability(id);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records Not Found");
                }
                else
                {

                    response = new ItemsResponse<ScheduleAvailability> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);
        }

        [HttpGet("availability/V2/vet/{id:int}")]
        public ActionResult<ItemsResponse<ScheduleAvailabilityV2>> GetAllAvailabilityByVet(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<ScheduleAvailabilityV2> list = _service.GetAllAvailabilityByVet(id);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records Not Found");
                }
                else
                {

                    response = new ItemsResponse<ScheduleAvailabilityV2> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);
        }

        [HttpGet("availability/createdby")]
        public ActionResult<ItemsResponse<ScheduleAvailability>> GetAvailabilityByCreatedBy()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int createdBy = _authService.GetCurrentUserId();
                List<ScheduleAvailability> list = _service.GetAvailabilityByCreatedBy(createdBy);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records Not Found");
                }
                else
                {
                    response = new ItemsResponse<ScheduleAvailability> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost("availability")]
        public ActionResult<ItemResponse<int>> AddAvailability(ScheduleAvailabilityAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddAvailability(model, userId);

                ItemResponse<int> response = new ItemResponse<int> { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPost("availability/V2")]
        public ActionResult<ItemResponse<int>> AddAvailabilityV2(ScheduleAvailabilityAddRequestV2 model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddAvailabilityV2(model, userId);

                ItemResponse<int> response = new ItemResponse<int> { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpDelete("availability/{id:int}")]
        public ActionResult<SuccessResponse> DeleteAvailability(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteAvailabilityById(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpDelete("availability/V2/{id:int}")]
        public ActionResult<SuccessResponse> DeleteAvailabilityV2(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteAvailabilityByIdV2(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("availability/{id:int}")]
        public ActionResult<SuccessResponse> UpdateAvailability(ScheduleAvailabilityUpdateRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateAvailability(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("availability/V2/{id:int}")]
        public ActionResult<SuccessResponse> UpdateAvailabilityV2(ScheduleAvailabilityUpdateRequestV2 model)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateAvailabilityV2(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("availability/schedule/{scheduleId:int}")]
        public ActionResult<ItemsResponse<ScheduleAvailability>> GetAvailabilityByScheduleId(int scheduleId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<ScheduleAvailability> list = _service.GetAvailabilityByScheduleId(scheduleId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Schedule Resource not found");
                }
                else
                {
                    response = new ItemsResponse<ScheduleAvailability> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}
