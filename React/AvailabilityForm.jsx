import React, { Fragment, useState } from "react";
import { Row, Col, FormLabel, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./availability.css";
import { formValidation } from "schemas/scheduleAvailabilitySchema";
import lookUpService from "services/lookUpService";
import { useEffect } from "react";
import toastr from "toastr";
import { Trash2, PlusCircle, Save, RotateCcw } from "react-feather";
import "sweetalert2/src/sweetalert2.scss";
import { getDay, parseISO } from "date-fns";

function AvailabilityForm(props) {
  const aSched = props.aSched;
  const [daysOfWeek, setDays] = useState({
    arrayOfDays: [],
    daysComponents: [],
  });
  const userRoles = props.currentUser;
  useEffect(() => {
    lookUpService
      .LookUp(["daysofweek"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const onLocalReset = () => {
    props.onReset();
  };

  const mapDays = (aDay) => {
    return (
      <Fragment key={aDay.id}>
        <option value={aDay.id}>{aDay.name}</option>
      </Fragment>
    );
  };

  const onLookUpSuccess = (data) => {
    let arrayOfDays = data.item.daysofweek;

    setDays((prevState) => {
      const days = { ...prevState };
      days.arrayOfDays = arrayOfDays;
      days.daysComponents = arrayOfDays.map(mapDays);
      return days;
    });
  };

  const onLookUpError = () => {
    toastr["error"]("Something went wrong with loading days", "Load failed");
  };

  const onLocalDeleteClick = () => {
    props.onClicked(props.aSched);
  };

  return (
    <Fragment>
      <Row>
        <Formik
          enableReinitialize={true}
          initialValues={aSched}
          onSubmit={props.onSubmit}
          validationSchema={formValidation}
        >
          {({ handleChange, setFieldValue }) => (
            <Form className="schAvailFormFont">
              <Row>
                <Col>
                  <div className="mb-3">
                    <Field type="hidden" name="id" className="form-control" />
                    <Field
                      type="hidden"
                      name="scheduleId"
                      className="form-control"
                    />
                    <div className="mb-3">
                      <div className="form-group">
                        <FormLabel htmlFor="startTime">
                          <h4>Start Time and End Time</h4>
                        </FormLabel>
                      </div>
                      <Field
                        type="datetime-local"
                        name="startTime"
                        className="form-control"
                        onChange={(values) => {
                          handleChange(values);
                          setFieldValue(
                            "dayOfWeek",
                            getDay(parseISO(values.target.value)) === 0
                              ? 7
                              : getDay(parseISO(values.target.value))
                          );
                        }}
                      />
                      <ErrorMessage
                        name="startTime"
                        component="div"
                        className="schedule-has-error"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        type="datetime-local"
                        name="endTime"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="endTime"
                        component="div"
                        className="schedule-has-error"
                      />
                    </div>
                    <Field
                      disabled
                      as="select"
                      name="dayOfWeek"
                      className="form-control"
                    >
                      <option>Select</option>
                      {daysOfWeek.daysComponents}
                    </Field>
                    <ErrorMessage
                      name="dayOfWeek"
                      component="div"
                      className="schedule-has-error"
                    />
                  </div>
                  <Col>
                    <div className="justify-content-start">
                      {userRoles.includes("Vet") ||
                      userRoles.includes("Admin") ? (
                        <Fragment>
                          <Col className="d-flex justify-content-center">
                            <Button
                              variant="primary"
                              type="submit"
                              className="btn btn-primary availabilityFormBtnSize"
                            >
                              {!aSched.id ? (
                                <Fragment>
                                  {"Create "}
                                  <PlusCircle className="availFormIconSize" />
                                </Fragment>
                              ) : (
                                <Fragment>
                                  Save <Save className="availFormIconSize" />
                                </Fragment>
                              )}
                            </Button>
                            <Button
                              variant="outline-secondary"
                              type="button"
                              onClick={onLocalReset}
                              className="availabilityFormBtnSize "
                            >
                              {"Reset "}
                              <RotateCcw className="availFormIconSize" />
                            </Button>
                            {aSched.id ? (
                              <Fragment>
                                {" "}
                                <Button
                                  variant="outline-danger"
                                  type="button"
                                  onClick={onLocalDeleteClick}
                                  className="availabilityFormBtnSize"
                                >
                                  Delete
                                  <Trash2 className="availFormIconSize" />
                                </Button>
                              </Fragment>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Row>
    </Fragment>
  );
}

AvailabilityForm.propTypes = {
  aSched: PropTypes.shape({
    id: PropTypes.number,
    scheduleId: PropTypes.number.isRequired,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }),
  onClicked: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  onLocalDeleteClick: PropTypes.func,
  currentUser: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default React.memo(AvailabilityForm);
