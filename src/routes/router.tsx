import { createBrowserRouter } from "react-router";
import Calendar from "../pages/calendar/calendar";
import Home from "@/pages/home/home";
import Settings from "@/pages/setting/settings";
import Gantt from "@/pages/gantt/gantt";

const router = createBrowserRouter([
	{
		path: "/calendar",
		element: <Calendar />,
	},
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/settings",
		element: <Settings />,
	},
	{
		path: "/gantt",
		element: <Gantt />,
	},
]);

export { router };
