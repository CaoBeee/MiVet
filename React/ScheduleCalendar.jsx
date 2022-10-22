import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Col, Modal, Card } from "react-bootstrap";
import { PlusSquare } from "react-feather";
import PropTypes from "prop-types";
import scheduleService from "../../../services/scheduleAvailabilityService";
import AvailabilityForm from "./AvailabilityForm";
import "./availability.css";
import toastr from "toastr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, parseISO, startOfWeek, getDay } from "date-fns";
import { formatISO9075 } from "date-fns/fp";
import { formatTime } from "utils/dateFormater";
import debug from "sabio-debug";
import { ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

function ScheduleCalendar(props) {
  const [schedules, setSchedules] = useState({
    arrayOfSchedules: [],
    calenderComponents: [],
  });
  const [show, setShow] = useState(false);
  const [aSched, setFormData] = useState({
    id: 0,
    scheduleId: 10, //hardcoded until implemented into schedules
    startTime: "",
    endTime: "",
    dayOfWeek: 0,
  });
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "me-1 mb-2 btn-outline-primary availabilityFormBtnSize availbilitySwalBtnConfirm",
      cancelButton:
        "me-1 mb-2 btn-outline-primary availabilityFormBtnSize availbilitySwalBtnCancel",
    },
    buttonsStyling: true,
  });

  const [vetProfileId] = useState(4); //hardcoded until implemented in vet profiles
  const userRoles = props.currentUser.roles;
  const allEvents = schedules.calenderComponents;
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    parseISO,
    startOfWeek,
    getDay,
    locales,
  });
  const _logger = debug.extend("AvailabilityCalender");

  useEffect(() => {
    scheduleService
      .getAvailabilityByVetId(vetProfileId)
      .then(onGetScheduleSuccess)
      .catch(onGetScheduleError);
    _logger(schedules);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = (value) => {
    let payload = {
      dayOfWeek: null,
      startTime: null,
      endTime: null,
    };

    setFormData((prevState) => {
      const fd = { ...prevState };
      fd.id = value.id;
      fd.scheduleId = value.scheduleId;
      fd.dayOfWeek = parseInt(value.dayOfWeek);
      fd.startTime = value.startTime;
      fd.endTime = value.endTime;

      return fd;
    });
    if (value.id && value.id !== undefined) {
      payload.id = value.id;
      payload.scheduleId = value.scheduleId;
      payload.dayOfWeek = parseInt(value.dayOfWeek);

      payload.startTime = value.startTime.replace(" ", "T");
      payload.endTime = value.endTime.replace(" ", "T");

      scheduleService
        .editScheduleAvailabilityV2(payload)
        .then(onEditSuccess)
        .catch(onEditErr);
    } else if (!value.id || value.id === 0) {
      let addPayload = {
        scheduleId: value.scheduleId,
        startTime: value.startTime.replace(" ", "T"),
        endTime: value.endTime.replace(" ", "T"),
        dayOfWeek: getDay(parseISO(value.startTime)),
      };
      setFormData((prevState) => {
        const fd = { ...prevState };
        fd.dayOfWeek = getDay(parseISO(value.startTime));
        return fd;
      });

      scheduleService
        .createScheduleAvailabilityV2(addPayload)
        .then(onCreateSuccess)
        .catch(onCreateError);
    }
  };

  const onEditClick = useCallback((anEvent) => {
    let dayOfW = getDay(anEvent.start);
    if (dayOfW === 0) {
      dayOfW = 7;
    }
    setFormData((prevState) => {
      const fd = { ...prevState };
      fd.id = anEvent.id;
      fd.dayOfWeek = dayOfW;

      fd.scheduleId = aSched.scheduleId;
      fd.startTime = formatISO9075(anEvent.start);
      fd.endTime = formatISO9075(anEvent.end);
      return fd;
    });

    setShow(true);
  }, []);

  const onCreateClick = () => {
    onReset();
    handleShow();
  };

  const onReset = () => {
    setFormData((prevState) => {
      const fd = { ...prevState };
      fd.id = 0;
      fd.scheduleId = aSched.scheduleId;
      fd.dayOfWeek = 0;
      fd.startTime = "";
      fd.endTime = "";

      return fd;
    });
  };

  const onDeleteClick = useCallback((aSchedule) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure you want delete this event?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm Delete",
        cancelButtonText: "Cancel!",
        reverseButtons: true,
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const handler = onDeleteSuccess(aSchedule.id);
          scheduleService
            .deleteScheduleAvailabilityV2(aSchedule.id)
            .then(handler)
            .catch(onDeleteError);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled", "", "error");
        }
      });
  }, []);

  //#endregion

  //#region Response Handlers
  const onGetScheduleSuccess = (data) => {
    let arrayOfSchedules = data.items;

    setSchedules((prevState) => {
      const sd = { ...prevState };
      sd.arrayOfSchedules = arrayOfSchedules;
      sd.calenderComponents = arrayOfSchedules.map(mapCalender);
      return sd;
    });
  };

  const mapCalender = (aSched) => {
    const availObj = {
      id: aSched.id,
      title: `Available ${formatTime(aSched.startTime)} to ${formatTime(
        aSched.endTime
      )}`,
      start: parseISO(aSched.startTime),
      end: parseISO(aSched.endTime),
    };
    return availObj;
  };

  const onGetScheduleError = () => {
    toastr["error"]("Could not load availability", "Get failed");
  };

  const onEditSuccess = () => {
    toastr["success"]("Update Successful", "Update Success");

    scheduleService
      .getAvailabilityByVetId(vetProfileId)
      .then(onGetScheduleSuccess)
      .catch(onGetScheduleError);
  };

  const onEditErr = () => {
    toastr["error"]("Something went wrong with update", "Update failed");
  };

  const onCreateSuccess = () => {
    toastr["success"](
      "You have added an availability successfully",
      "Add Success"
    );
    scheduleService
      .getAvailabilityByVetId(vetProfileId)
      .then(onGetScheduleSuccess)
      .catch(onGetScheduleError);
  };

  const onCreateError = () => {
    toastr["error"]("Something went wrong with add", "Add failed");
  };

  const onDeleteSuccess = (idToBeDeleted) => {
    swalWithBootstrapButtons.fire(
      "Deleted!",
      "Event has been deleted.",
      "success"
    );
    return () => {
      setSchedules((prevState) => {
        const sd = { ...prevState };
        sd.arrayOfSchedules = [...sd.arrayOfSchedules];

        const idxOf = sd.arrayOfSchedules.findIndex((mySchedule) => {
          let result = false;

          if (mySchedule.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });
        if (idxOf >= 0) {
          sd.arrayOfSchedules.splice(idxOf, 1);
          sd.calenderComponents = sd.arrayOfSchedules.map(mapCalender);
        }
        return sd;
      });
    };
  };

  const onDeleteError = () => {
    toastr["error"]("Something went wrong Delete", "Delete failed");
  };

  //#endregion

  return (
    <Fragment>
      <Col>
        <div className="text-center">
          {userRoles.includes("Vet") || userRoles.includes("Admin") ? (
            <Button
              className="schACreate-btn mb-3"
              variant="primary"
              onClick={onCreateClick}
            >
              {"Create an Availability "}
              <PlusSquare />
            </Button>
          ) : (
            ""
          )}
        </div>
        <Card>
          <Card.Body>
            <Calendar
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 700 }}
              onSelectEvent={onEditClick}
              aSched={aSched}
              eventPropGetter={() => ({
                style: {
                  backgroundColor: "#754ffe",
                  color: "white",
                  textAlign: "left",
                },
              })}
            />
            <Modal
              className="schModalCenter modal-sm"
              show={show}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                {userRoles.includes("Vet") || userRoles.includes("Admin") ? (
                  <Modal.Title className="w-100">
                    {!aSched.id ? "Create" : "Edit"}
                  </Modal.Title>
                ) : (
                  <Modal.Title className="w-100">
                    Availability Details
                  </Modal.Title>
                )}
              </Modal.Header>
              <Modal.Body>
                <Col>
                  <Card className="mt-4 mt-lg-0 mb-4">
                    <Card.Body className="p-0">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <span className="text-body">Availability Date</span>
                          <h5>
                            {` ${new Date(
                              parseISO(aSched.startTime)
                            ).toDateString("en-us")}`}{" "}
                          </h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <span className="text-body">Time</span>
                          <h5>
                            {` ${formatTime(
                              parseISO(aSched.startTime)
                            )} - ${formatTime(parseISO(aSched.endTime))}`}
                          </h5>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  {userRoles.includes("Vet") || userRoles.includes("Admin") ? (
                    <AvailabilityForm
                      onReset={onReset}
                      aSched={aSched}
                      key={aSched.id}
                      onSubmit={onSubmit}
                      onClicked={onDeleteClick}
                      currentUser={userRoles}
                    />
                  ) : (
                    ""
                  )}
                </Col>
              </Modal.Body>
            </Modal>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
}

ScheduleCalendar.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default ScheduleCalendar;
