import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/query/queryClient";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router"; // your react-router config
import { QueryClientProvider } from "@tanstack/react-query";
const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
);
