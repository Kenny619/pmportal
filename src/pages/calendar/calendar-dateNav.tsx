import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import {
	ChevronLeft,
	ChevronRight,
	Calendar as CalendarIcon,
	CircleX,
	FunnelPlus,
	FunnelX,
	ChevronUp,
	ChevronDown,
	Funnel,
	CirclePlus,
} from "lucide-react";

import {
	calendarViewStore,
	showCalendarStore,
	dateNavStore,
} from "@/stores/calendarStore";
import type {
	DateNavState,
	CalendarViewState,
	showCalendarState,
} from "@/stores/calendarStore";

import { useRef, useEffect } from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { wbsStore, type Filter, type WbsState } from "@/stores/wbsStore";
import { isCalendarFilterOn } from "@/lib/utils";
export default function CalendarDateNav() {
	//nav states
	const stView = calendarViewStore((state: CalendarViewState) => state.view);
	const stSetView = calendarViewStore(
		(state: CalendarViewState) => state.setView,
	);
	const stCurMonth = dateNavStore((state: DateNavState) => state.startMonth);
	const stNextMonth = new Date(
		stCurMonth.getFullYear(),
		stCurMonth.getMonth() + 1,
		1,
	);
	const stDecMonth = dateNavStore((state: DateNavState) => state.decMonth);
	const stIncMonth = dateNavStore((state: DateNavState) => state.incMonth);
	const stStartDays = dateNavStore((state: DateNavState) => state.startDay);
	const stFiveDays = dateNavStore((state: DateNavState) => state.nextFiveDays);
	const stIncDays = dateNavStore((state: DateNavState) => state.incDay);
	const stDecDays = dateNavStore((state: DateNavState) => state.decDay);
	const stSetDate = dateNavStore((state: DateNavState) => state.setDate);
	const stReset = dateNavStore((state: DateNavState) => state.reset);
	const stShowCalendar = showCalendarStore(
		(state: showCalendarState) => state.showCalendar,
	);
	const stDisplayCalendar = showCalendarStore(
		(state: showCalendarState) => state.displayCalendar,
	);
	const calendarRef = useRef<HTMLDivElement>(null);

	//filter states
	const [isOpen, setIsOpen] = React.useState(false);
	const currentFilter = wbsStore((state: WbsState) => state.currentFilter);
	const defaultFilter = wbsStore((state: WbsState) => state.defaultFilter);
	const updateFilter = wbsStore((state: WbsState) => state.updateFilter);
	const selectGroupFilter = wbsStore(
		(state: WbsState) => state.selectGroupFilter,
	);
	const clearGroupFilter = wbsStore(
		(state: WbsState) => state.clearGroupFilter,
	);
	const selectAllFilter = wbsStore((state: WbsState) => state.selectAllFilter);
	const clearAllFilter = wbsStore((state: WbsState) => state.clearAllFilter);

	//key names
	const filterKeyNames = {
		G: "Stages",
		pjtName: "Projects",
		Fn: "Functions",
		Owner: "Owners",
		DateST: "Date Status",
		Status: "Task Status",
	};
	useEffect(() => {
		if (!stShowCalendar) return;
		function handleClickOutside(event: MouseEvent) {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(event.target as Node)
			) {
				stDisplayCalendar();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [stShowCalendar, stDisplayCalendar]);

	return (
		<>
			<Collapsible
				open={isOpen}
				onOpenChange={setIsOpen}
				className="w-full space-y-2 bg-neutral-50"
			>
				{/* datanav parent div */}
				<div className="w-full flex flex-col lg:flex-row items-center lg:justify-between bg-neutral-50 p-2 mt-2 lg:mt-0 mb-4 rounded-xs h-20 lg:h-10 relative ">
					{/* date range */}
					<div className="item-start text-xs font-bold mt-1 lg:mt-0 lg:ml-1 whitespace-nowrap">
						{stView
							? `${stCurMonth.toLocaleString("en-US", { month: "long" })} - ${stNextMonth.toLocaleString("en-US", { month: "long" })}, ${stCurMonth.getFullYear()}`
							: `${stStartDays.toLocaleString("en-US", { month: "long", day: "numeric" })} - ${stFiveDays[4].toLocaleString("en-US", { month: "long", day: "numeric" })}, ${stStartDays.getFullYear()}`}
					</div>

					{/* date nav and filter container for mobile view*/}
					<div className="w-full flex items-center justify-end gap-2 mt-2 lg:mt-0  mb-0 relative  ">
						{/* date navigation */}
						{/* <div className="flex flex-1 w-full md:w-auto items-center justify-center gap-2 lg:gap-4 text-neutral-600 my-3 md:my-0 h-full"> */}
						<div className="flex flex-1 items-center justify-center gap-2 lg:gap-4 text-neutral-600 my-3 md:my-0 h-full absolute lg:relative left-0 right-0 ">
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
								<ChevronLeft
									size={16}
									strokeWidth={1}
									className="hover:text-black"
								/>
								<span className="text-xs ml-1">Previous</span>
							</button>
							<div className="flex items-center">
								<button
									type="button"
									className="flex items-center cursor-pointer border-0 bg-transparent hover:text-black"
									onClick={() => stReset()}
								>
									<span className="text-xs ml-1">Today</span>
								</button>
							</div>
							<div className="flex items-center mx-2 relative">
								<button
									type="button"
									className="flex items-center cursor-pointer border-0 bg-transparent hover:text-black"
									onClick={() => stDisplayCalendar()}
								>
									<CalendarIcon size={14} strokeWidth={1} />
								</button>
								{stShowCalendar && (
									<div
										ref={calendarRef}
										className="absolute left-0 top-full mt-2 z-50"
										style={{ minWidth: "200px" }}
									>
										<Calendar
											mode="single"
											selected={stStartDays}
											onSelect={(e) => {
												stSetDate(e as Date);
												stDisplayCalendar();
											}}
											className="bg-white shadow-xs text-xxs rounded-xs"
										/>
									</div>
								)}
							</div>
							<button
								type="button"
								className="flex items-center cursor-pointer border-0 bg-transparent"
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

						{/* right end container */}
						<div className="flex items-center justify-end">
							{/* switch between calendar and list view */}
							<div className="lg:h-auto lg:w-auto lg:flex space-x-2 mx-4 hidden text-xxs text-neutral-600">
								<Switch
									id="monthly"
									className="items-center"
									checked={stView}
									onCheckedChange={() =>
										stView ? stSetView(false) : stSetView(true)
									}
								/>
								<label htmlFor="monthly" className="items-center ">
									Monthly
								</label>
							</div>
							{/* event filter */}
							<div className="flex items-center justify-between space-x-4 px-4">
								<CollapsibleTrigger asChild>
									<div className="flex items-center hover:cursor-pointer ">
										<div className="flex items-center hover:cursor-pointer ">
											<div className="flex items-center md:item-end  hover:bg-neutral-100 px-2 py-1  text-neutral-600 ">
												<div className="flex items-center ">
													<Funnel
														size={11}
														strokeWidth={1}
														className="mr-1.5"
														color={
															isCalendarFilterOn(currentFilter, defaultFilter)
																? "red"
																: "gray"
														}
													/>
													<span
														className={`text-xs mr-2 ${
															isCalendarFilterOn(currentFilter, defaultFilter)
																? "text-red-500"
																: "text-neutral-600"
														}`}
													>
														Filter
													</span>
													{isCalendarFilterOn(currentFilter, defaultFilter) && (
														<span className="red-dot"> </span>
													)}
													{isOpen ? (
														<ChevronUp
															size={13}
															strokeWidth={1}
															className="ml-1"
														/>
													) : (
														<ChevronDown
															size={13}
															strokeWidth={1}
															className="ml-1"
														/>
													)}
												</div>
											</div>
										</div>
									</div>
								</CollapsibleTrigger>
							</div>
						</div>
					</div>
				</div>

				<CollapsibleContent className="w-full">
					<div className="flex flex-wrap w-full gap-1 py-2 px-4  bg-neutral-50">
						{Object.keys(defaultFilter).map((key) => (
							<div className="p-2 min-w-1/6 " key={key}>
								<div className="flex gap-1 my-2 border-b border-neutral-300 text-neutral-600">
									<div className="grow flex gap-1 items-center">
										<h2 className="text-xxs font-bold">
											{filterKeyNames[key as keyof typeof filterKeyNames]}
										</h2>
									</div>
									<div className="flex gap-2 items-center justify-end">
										<div
											className="flex items-center gap-1 hover:cursor-pointer hover:bg-neutral-100 hover:text-black py-0.5 rounded-full "
											onClick={() => selectGroupFilter(key as keyof Filter)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													selectGroupFilter(key as keyof Filter);
												}
											}}
										>
											<FunnelPlus size={10} strokeWidth={1} className="" />
											<span className="text-xxxs font-normal">Select All</span>
										</div>
										<div
											className="flex items-center gap-1 hover:cursor-pointer hover:bg-neutral-100 hover:text-black py-0.5 rounded-full "
											onClick={() => clearGroupFilter(key as keyof Filter)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													clearGroupFilter(key as keyof Filter);
												}
											}}
										>
											<FunnelX size={10} strokeWidth={1} className="" />
											<span className="text-xxxs font-normal">Clear All</span>
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-1 text-xxs  ">
									{defaultFilter[key as keyof Filter].map((item) => (
										<div
											key={item}
											onClick={() => {
												updateFilter(key as keyof Filter, item);
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													updateFilter(key as keyof Filter, item);
												}
											}}
											className={` px-0 py-0.5 rounded-full  ${
												currentFilter[key as keyof Filter].includes(item)
													? "filter-selected"
													: "filter-unselected"
											}`}
										>
											<label
												htmlFor={item}
												className="flex gap-1 items-center text-left px-2"
											>
												{currentFilter[key as keyof Filter].includes(item) ? (
													<CircleX
														size={12}
														strokeWidth={1}
														className="justify-start"
													/>
												) : (
													<CirclePlus
														size={12}
														strokeWidth={1}
														className="justify-start"
													/>
												)}
												<span className="text-xxs justify-center">{item}</span>
											</label>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</>
	);
}
