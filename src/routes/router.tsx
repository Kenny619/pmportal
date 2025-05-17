import { createBrowserRouter } from "react-router";
import App from "../pages/App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
]);

export { router };
