import * as Yup from "yup";

const formValidation = Yup.object().shape({
  id: Yup.string(),
  scheduleId: Yup.string().required("ScheduleID is required"),
  dayOfWeek: Yup.number().typeError("Please select a day"),
  startTime: Yup.string().required("Please enter a start time"),
  endTime: Yup.string().required("Please enter an end time"),
});

export { formValidation };
