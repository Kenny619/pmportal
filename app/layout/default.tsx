import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";

export default function Layout() {
	return (
		<div className="w-full bg-neutral-100">
			<SidebarProvider
				style={
					{
						"--sidebar-width": "10rem",
						"--sidebar-width-mobile": "10rem",
					} as React.CSSProperties
				}
			>
				<AppSidebar />
				<SidebarTrigger />
				<Outlet />
			</SidebarProvider>
		</div>
	);
}
