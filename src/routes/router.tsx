import { createBrowserRouter } from "react-router";
import Calendar from "../pages/calendar/calendar";
import Home from "@/pages/home/home";

const router = createBrowserRouter([
	{
		path: "/calendar",
		element: <Calendar />,
	},
	{
		path: "/",
		element: <Home />,
	},
]);

export { router };
