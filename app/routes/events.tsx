import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

import EventFiveDays from "@/components/events-5days";
import EventDateNav from "@/components/event-dateNav";
import EventMonthly from "@/components/events-monthly";
import { eventViewStore } from "@/store/eventStore";
export default function Events() {
	const stEventMonthView = eventViewStore(
		(state: { view: boolean }) => state.view,
	);
	return (
		<div className="w-full">
			<header className="w-full pt-3 mb-6 flex items-center justify-between ">
				<Breadcrumb>
					<BreadcrumbList className="text-xxs">
						<BreadcrumbItem>
							<Link to="/">Home</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Events</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</header>

			<h1 className="text-3xl font-bold mb-4">Events</h1>

			<div className="flex flex-wrap md:flex-nowrap w-full">
				{/* 5 events container  */}
				<div className="px-2 pt-4 w-full ">
					{/* date navigation area */}
					<EventDateNav />
					{/* day container */}
					{stEventMonthView ? <EventMonthly /> : <EventFiveDays />}
				</div>
			</div>
		</div>
	);
}
