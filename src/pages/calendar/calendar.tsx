import Layout from "../layout";
import CalendarDateNav from "@/pages/calendar/calendar-dateNav";
import CalendarMonth from "@/pages/calendar/calendar-month";
import CalendarWeek from "@/pages/calendar/calendar-week";
import {
	calendarViewStore,
	type CalendarViewState,
} from "@/stores/calendarStore";
export default function Calendar() {
	//fetch wbs data and store into wbsStore
	const stCalendarMonthView = calendarViewStore(
		(state: CalendarViewState) => state.view,
	);

	const breadcrumb = [{ label: "Calendar", link: "/calendar" }];

	return (
		<Layout breadcrumb={breadcrumb}>
			<div className="w-full h-full">
				<h1 className="text-3xl font-bold my-8">Due Dates</h1>
			</div>
			<div className="flex flex-wrap md:flex-nowrap w-full">
				{/* 5 events container  */}
				<div className="w-full ">
					{/* date navigation area */}
					<CalendarDateNav />
					{/* day container */}
					{stCalendarMonthView ? <CalendarMonth /> : <CalendarWeek />}
				</div>
			</div>
		</Layout>
	);
}
