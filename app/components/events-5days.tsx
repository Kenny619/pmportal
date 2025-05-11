import { CircleUserRound, CalendarCheck, SquareFunction } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "@/components/ui/badge";
import { showDayStore, type showDayState } from "@/store/eventStore";
export default function EventFiveDays() {
	const stStartDays = showDayStore((state: showDayState) => state.startDay);
	const stFiveDays = showDayStore((state: showDayState) => state.nextFiveDays);

	//set starting day
	//check for events happening on non-workdays

	return (
		<div className="flex flex-nowrap gap-2">
			{/* day 1 */}
			{stFiveDays.map((day) => (
				<div
					key={day.toLocaleString("en-US", { day: "numeric" })}
					className="y-4 w-full lg:w-1/5"
				>
					<h3 className="mb-1 text-md">
						{day.toLocaleString("en-US", { day: "numeric" })}
						<span className="text-xxxs ml-1">
							{day.toLocaleString("en-US", { weekday: "long" })}
						</span>
					</h3>
					<Separator orientation="horizontal" className="mb-2" />

					{/* event 1 */}
					<div className="w-full bg-neutral-50 p-2 rounded-xs my-2 border-l-4 border-amber-200 shadow-sm ">
						<div className="flex items-center p-0">
							<Badge className="bg-amber-200 text-xxxxs rounded-xs py-0 my-0 px-1 mr-1">
								JP25A016
							</Badge>
							<Badge
								variant="outline"
								className="text-xxxxs  rounded-xs py-0 px-1 mr-1"
							>
								G0
							</Badge>
						</div>
						<span className="text-xxxs font-bold">test project 0016</span>

						<div className="w-full py-1 text-sm">PreG3 Functional Review</div>
						<div className="w-full mt-1 mb-2 text-xxxs text-gray-700">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
							quos.
						</div>
						<div className="w-full mt-1 text-xxxs flex flex-nowrap lg:flex-col gap-1">
							<div className="flex items-center">
								<SquareFunction size={14} strokeWidth={1} />
								<div className="text-xxxs ml-1 mr-2 w-min-[100px] ">CO</div>
							</div>
							<div className="flex items-center">
								<CircleUserRound size={14} strokeWidth={1} />
								<span className="text-xxxs ml-1 mr-2">Name Here</span>
							</div>
							<div className="flex items-center">
								<CalendarCheck
									size={14}
									strokeWidth={1}
									className="text-green-700"
								/>
								<div className="text-xxxs  text-green-700 px-1">Confirmed</div>
							</div>
						</div>
					</div>

					<div className="w-full bg-neutral-50 p-2 rounded-xs my-2 border-l-4 border-blue-200 shadow-sm ">
						<div className="flex items-center p-0">
							<Badge className="bg-blue-200 text-xxxxs rounded-xs py-0 my-0 px-1 mr-1">
								JP25A016
							</Badge>
							<Badge
								variant="outline"
								className="text-xxxxs rounded-xs py-0 px-1 mr-1"
							>
								G3
							</Badge>
						</div>
						<span className="text-xxxs font-bold">test project 0018</span>

						<div className="w-full py-1 text-sm">Task Title Here</div>
						<div className="w-full mt-1 text-xxxs flex flex-nowrap lg:flex-col gap-1">
							<div className="flex items-center">
								<SquareFunction size={14} strokeWidth={1} />
								<span className="text-xxxs ml-1 mr-2 w-min-[100px]">
									MKTKTKI
								</span>
							</div>
							<div className="flex items-center">
								<CircleUserRound size={14} strokeWidth={1} />
								<span className="text-xxxs ml-1 mr-2">Name Here</span>
							</div>
							<div className="flex items-center">
								<CalendarCheck
									size={14}
									strokeWidth={1}
									className="text-amber-700"
								/>
								<div className="text-xxxs px-1 text-amber-700">Tentative</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
