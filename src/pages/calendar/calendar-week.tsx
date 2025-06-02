import { Separator } from "@/components/ui/separator";
import { dateNavStore, type DateNavState } from "@/stores/calendarStore";
import { dateToExcelSerial } from "@/lib/utils";
import { wbsStore, type WbsState } from "@/stores/wbsStore";
import { LoadingSpinner } from "@/components/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import CalenderWeekTask from "./calendar-week-task";
import { AlarmClockCheck } from "lucide-react";
import { useFetchWBS } from "@/query/queryWBS";
export default function CalendarWeek() {
	const stFiveDays = dateNavStore((state: DateNavState) => state.nextFiveDays);
	const wbs = wbsStore((state: WbsState) => state.wbs);
	const pgcms = wbsStore((state: WbsState) => state.pgcm);
	const isLoading = useFetchWBS();
	return (
		<>
			{/* date bar */}
			<div className="flex flex-nowrap flex-col lg:flex-row gap-2 mt-5 px-4">
				{stFiveDays.map((day) => (
					<div
						key={day.toLocaleString("en-US", { day: "numeric" })}
						className="y-4 w-full lg:w-1/5"
					>
						<h3 className="mt-4 mb-1 text-md">
							{day.toLocaleString("en-US", { day: "numeric" })}
							<span className="text-xxxs ml-1">
								{day.toLocaleString("en-US", { weekday: "long" })}
							</span>
						</h3>
						<Separator
							orientation="horizontal"
							className="mb-2 border-neutral-200"
						/>
						{/* Events for mobile view */}
						<div className="flex flex-col">
							{pgcms.includes(dateToExcelSerial(day)) && (
								<div className="flex flex-col">
									<div className="text-xxxs bg-amber-600 text-white px-2 py-0.5 rounded-xs font-bold flex flex-row items-center gap-2">
										<AlarmClockCheck size={12} strokeWidth={1.5} className="" />
										<span>PGCM</span>
									</div>
								</div>
							)}
						</div>
						{/* tasks for mobile view */}
						<div className="block lg:hidden">
							{Object.keys(wbs).includes(dateToExcelSerial(day).toString()) &&
								wbs[dateToExcelSerial(day).toString()]?.map((task) => (
									<CalenderWeekTask
										key={`${task.id}-${task.pjtName}-${task.Task}-${task.Fn}`}
										{...task}
									/>
								))}
						</div>
					</div>
				))}
			</div>
			{/* task bar for PC view */}
			<div className="hidden lg:block">
				<ScrollArea className="h-[calc(100vh-300px)] px-4">
					<div className="flex flex-nowrap flex-col lg:flex-row gap-2 mt-5">
						{isLoading ? (
							<div className="w-full h-full flex items-center justify-center">
								<LoadingSpinner />
							</div>
						) : (
							stFiveDays.map((day) => (
								<div
									key={`${day.toLocaleString("en-US", { day: "numeric" })}-task`}
									className="y-4 w-full lg:w-1/5"
								>
									{Object.keys(wbs).includes(
										dateToExcelSerial(day).toString(),
									) &&
										wbs[dateToExcelSerial(day).toString()]?.map((task) => (
											<CalenderWeekTask
												key={`${task.id}-${task.pjtName}-${task.Task}-${task.Fn}`}
												{...task}
											/>
										))}
								</div>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</>
	);
}
