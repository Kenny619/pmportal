import BreadCrumb from "@/components/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/app-sidebar";

export default function Layout({
	children,
	breadcrumb,
}: {
	children: React.ReactNode;
	breadcrumb: { label: string; link: string }[] | [];
}) {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "10rem",
					"--sidebar-width-mobile": "10rem",
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			<div className="w-full m-0 p-2">
				<div className="flex flex-row w-full items-center">
					<SidebarTrigger className="mb-1 " />
					{breadcrumb && <BreadCrumb breadcrumb={breadcrumb} />}
				</div>
				<div className="w-full px-3">{children}</div>
			</div>
		</SidebarProvider>
	);
}
