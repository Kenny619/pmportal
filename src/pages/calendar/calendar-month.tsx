import holidays from "date-holidays";
import { dateNavStore, type DateNavState } from "@/stores/calendarStore";
import calendarArr from "@/lib/calendarMonthView";
import { wbsStore, type WbsState } from "@/stores/wbsStore";
import CalenderMonthTask from "./calendar-month-task";
import { dateToExcelSerial } from "@/lib/utils";
import { AlarmClockCheck } from "lucide-react";

export default function CalenderMonthly() {
	//state
	const stCurMonth = dateNavStore((state: DateNavState) => state.startMonth);
	const stWbs = wbsStore((state: WbsState) => state.wbs);

	//holidays
	const hd = new holidays("JP");
	//calendar array
	const month = calendarArr(stCurMonth);
	//calendar cell css
	const layout =
		"p-1 flex items-start justify-start min-h-[120px] w-1/7 shadow-xs text-xxxs";
	const cssDayoff = `bg-pink-100 text-red-500 ${layout} `;
	const cssCMonth = `bg-white ${layout}`;
	const cssNMonth = `bg-neutral-100 ${layout}`;

	const pgcms = wbsStore((state: WbsState) => state.pgcm);

	const backgroundColor = (day: Date | null, index: number) => {
		if (day === null && index === 0) return cssCMonth;
		if (day === null && index > 0) return cssNMonth;
		if (hd.isHoliday(day as Date)) return cssDayoff;
		if (day?.getDay() === 0 || day?.getDay() === 6) return cssDayoff;
		if (day?.getMonth() === stCurMonth.getMonth()) return cssCMonth;
		return cssNMonth;
	};

	return (
		<div className="w-full flex flex-col my-2">
			{month.map((week: (Date | null)[], index: number) => (
				<div
					key={`${stCurMonth.getMonth()}-${index}`}
					className="flex justify-between gap-1 mb-1"
				>
					{week.map((day: Date | null, index: number) => (
						<div
							key={`${day?.toLocaleString("en-US", { day: "numeric" })}-${index}`}
							className={`${backgroundColor(day, index)} flex flex-col ${
								day?.toDateString() === new Date().toDateString()
									? " border-gray-500 border-solid border-1"
									: ""
							}`}
						>
							{/* day */}
							<div
								className={
									day?.toDateString() === new Date().toDateString()
										? "font-bold py-1 px-1.5 rounded-full bg-black text-white"
										: "flex flex-col "
								}
							>
								{day?.toLocaleDateString("en-US", { weekday: "short" }) ===
								"Sun" ? (
									<div className="flex flex-col items-center justify-center">
										<div className="text-xxxs font-bold">
											{day?.toLocaleDateString("en-US", { month: "short" })}-
											{day?.toLocaleDateString("en-US", { day: "numeric" })}
										</div>
									</div>
								) : (
									day?.getDate()
								)}
							</div>
							{/* Events  */}
							<div className="flex flex-col pr-1 pb-1 w-full">
								{day && pgcms.includes(dateToExcelSerial(day)) && (
									<div className="flex flex-col ">
										<div className="text-xxxxs bg-amber-600 text-white px-2 py-0.5 rounded-xs font-bold flex flex-row items-center gap-2">
											<AlarmClockCheck
												size={12}
												strokeWidth={1.5}
												className=""
											/>
											<span>PGCM</span>
										</div>
									</div>
								)}
							</div>
							{day &&
								Object.keys(stWbs).includes(
									dateToExcelSerial(day).toString(),
								) &&
								stWbs[dateToExcelSerial(day).toString()]?.map((task, index) => (
									<CalenderMonthTask
										key={`${stCurMonth.getMonth()}-${day.getDate()}-task-${index}`}
										{...task}
									/>
								))}
						</div>
					))}
				</div>
			))}
		</div>
	);
}
