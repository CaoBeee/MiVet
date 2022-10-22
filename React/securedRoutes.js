import { lazy } from "react";
const PageNotFound = lazy(() => import("../components/error/Error404"));
const ScheduleCalendar = lazy(() => import("../components/schedules/availability/ScheduleCalendar")
);

const scheduleRoutes = [
  {
    path: "/schedule/availability/",
    name: "Availability",
    element: ScheduleCalendar,
    roles: ["Vet", "Admin", "User"],
    exact: true,
    isAnonymous: false,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
];


const allRoutes = [
  ...scheduleRoutes,
  ...errorRoutes,
];

export default allRoutes;
