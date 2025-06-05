import { createBrowserRouter } from "react-router";
import Calendar from "../pages/calendar/calendar";
import Home from "@/pages/home/home";
import Settings from "@/pages/setting/settings";

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
]);

export { router };
