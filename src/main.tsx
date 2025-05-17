import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";

const root = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<RouterProvider router={router} />,
		// <StrictMode>
		// 	<App />
		// </StrictMode>,
	);
}
