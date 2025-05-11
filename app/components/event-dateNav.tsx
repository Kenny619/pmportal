import { Switch } from "@/components/ui/switch";
import {
	ChevronLeft,
	ChevronRight,
	Calendar,
	SlidersHorizontal,
} from "lucide-react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import {
	showMonthStore,
	showDayStore,
	eventViewStore,
} from "@/store/eventStore";
import type {
	showMonthState,
	showDayState,
	EventViewState,
} from "@/store/eventStore";

import EventsFilter from "@/components/events-filter";

export default function EventDateNav() {
	//states
	const stView = eventViewStore((state: EventViewState) => state.view);
	const stSetView = eventViewStore((state: EventViewState) => state.setView);
	const stCurMonth = showMonthStore((state: showMonthState) => state.cMonth);
	const stDecMonth = showMonthStore((state: showMonthState) => state.decMonth);
	const stIncMonth = showMonthStore((state: showMonthState) => state.incMonth);
	const stNextMonth = showMonthStore((state: showMonthState) => state.nMonth);
	const stStartDays = showDayStore((state: showDayState) => state.startDay);
	const stFiveDays = showDayStore((state: showDayState) => state.nextFiveDays);
	const stIncDays = showDayStore((state: showDayState) => state.incDay);
	const stDecDays = showDayStore((state: showDayState) => state.decDay);
	return (
		<div className="flex flex-col md:flex-row items-center justify-between bg-neutral-50 p-2 mb-4 rounded-xs ">
			{/* displayed date range */}
			<div className="md:w-[250px] item-start text-sm font-bold mt-1 md:mt-0 md:ml-1">
				{stView
					? `${stCurMonth.toLocaleString("en-US", { month: "long" })} - ${stNextMonth.toLocaleString("en-US", { month: "long" })}, ${stCurMonth.getFullYear()}`
					: `${stStartDays.toLocaleString("en-US", { month: "long", day: "numeric" })} - ${stFiveDays[4].toLocaleString("en-US", { month: "long", day: "numeric" })}, ${stStartDays.getFullYear()}`}
				startDays:{stStartDays.toLocaleDateString()}
				nextFiveDays:{stFiveDays[4].toLocaleDateString()}
			</div>

			{/* date navigation */}
			<div className="flex w-full md:w-auto items-center flex-1 justify-center gap-4 text-neutral-600 my-3 md:my-0">
				<button
					type="button"
					className="flex items-center cursor-pointer border-0 bg-transparent hover:text-black "
					onClick={stView ? () => stDecMonth() : () => stDecDays()}
					onKeyDown={
						stView
							? (e) => e.key === "Enter" && stDecMonth()
							: (e) => e.key === "Enter" && stDecDays()
					}
				>
					<ChevronLeft size={16} strokeWidth={1} className="hover:text-black" />
					<span className="text-xs ml-1">Previous</span>
				</button>
				<div className="flex items-center">
					<span className="text-xs ml-1">Current</span>
				</div>
				<div className="flex items-center mx-2">
					<Calendar size={14} strokeWidth={1} />
				</div>
				<button
					type="button"
					className="flex items-center hover:underline cursor-pointer border-0 bg-transparent"
					onClick={stView ? () => stIncMonth() : () => stIncDays()}
					onKeyDown={
						stView
							? (e) => e.key === "Enter" && stIncMonth()
							: (e) => e.key === "Enter" && stIncDays()
					}
				>
					<span className="text-xs mr-1">Next</span>
					<ChevronRight size={16} strokeWidth={1} />
				</button>
			</div>

			{/* switch between calendar and list view */}
			<div className="lg:h-auto lg:w-auto lg:flex space-x-2 mx-4 hidden text-xxs text-neutral-600">
				<Switch
					id="monthly"
					className="items-center"
					checked={stView}
					onCheckedChange={() => (stView ? stSetView(false) : stSetView(true))}
				/>
				<label htmlFor="monthly" className="items-center ">
					Monthly
				</label>
			</div>
			{/* event filter */}
			<Sheet>
				<SheetTrigger>
					<div className="flex items-center hover:cursor-pointer md:w-auto mb-2 md:mb-0">
						<div className="flex items-center md:item-end bg-neutral-50 hover:bg-neutral-100 p-2 rounded-xs shadow-xs ">
							<SlidersHorizontal size={14} strokeWidth={1} className="mx-2" />
							<span className="text-xs ml-1">Filter</span>
						</div>
					</div>
				</SheetTrigger>
				<SheetContent className="">
					<SheetHeader>
						<SheetTitle>Filter</SheetTitle>
						<SheetDescription className="m-0 p-0">
							<EventsFilter />
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
