import axios from "axios";
import * as helper from "./serviceHelpers";
const getSchedulesByVet = (id) => {
  const config = {
    method: "GET",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/vet/${id}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAvailabilityByScheduleId = (scheduleId) => {
  const config = {
    method: "GET",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/scheduleId/${scheduleId}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const createScheduleAvailability = (payload) => {
  const config = {
    method: "POST",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const editScheduleAvailability = (payload) => {
  const config = {
    method: "PUT",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/${payload.id}`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const editScheduleAvailabilityV2 = (payload) => {
  const config = {
    method: "PUT",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/V2/${payload.id}`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getScheduleById = (aSchedAvailId) => {
  const config = {
    method: "GET",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/${aSchedAvailId}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getScheduleByCreated = (userId) => {
  const config = {
    method: "GET",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/CreatedBy/${userId}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteScheduleAvailability = (aSchedAvailId) => {
  const config = {
    method: "DELETE",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/${aSchedAvailId}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteScheduleAvailabilityV2 = (aSchedAvailId) => {
  const config = {
    method: "DELETE",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/v2/${aSchedAvailId}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAvailabilityByVetId = (vetProfileId) => {
  const config = {
    method: "GET",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/v2/vet/${vetProfileId}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const createScheduleAvailabilityV2 = (payload) => {
  const config = {
    method: "POST",
    url: `${helper.API_HOST_PREFIX}/api/schedules/availability/V2/`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const scheduleService = {
  getSchedulesByVet,
  createScheduleAvailability,
  deleteScheduleAvailability,
  getScheduleById,
  getAvailabilityByScheduleId,
  editScheduleAvailability,
  getScheduleByCreated,
  getAvailabilityByVetId,
  createScheduleAvailabilityV2,
  editScheduleAvailabilityV2,
  deleteScheduleAvailabilityV2,
};
export default scheduleService;
