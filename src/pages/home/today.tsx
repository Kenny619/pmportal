import { useFetchWBS } from "@/query/queryWBS";
import {
	dateToExcelSerial,
	excelSerialToDate,
	getWorkDaysBetweenDates,
	getWorkdaysUntilFriday,
} from "@/lib/utils";
import { LoadingSpinner } from "@/components/loading";
import { wbsStore, type WbsState } from "@/stores/wbsStore";

export default function Today() {
	console.log("Today component rendering");

	const pgcm = wbsStore((state: WbsState) => state.pgcm);

	const isLoading = useFetchWBS();

	const today = new Date();
	// Set time to start of day to ensure consistent comparison
	today.setHours(0, 0, 0, 0);

	const filteredPgcm = pgcm.filter((date) => date > dateToExcelSerial(today));
	const nextPgcmDate =
		filteredPgcm.length > 0
			? excelSerialToDate(Math.min(...filteredPgcm))
			: null;

	// Set time to start of day for nextPgcmDate if it exists
	if (nextPgcmDate) {
		nextPgcmDate.setHours(0, 0, 0, 0);
	}

	const workdaysUntilFriday = getWorkdaysUntilFriday(today);
	const workdaysUntilNextPgcm = nextPgcmDate
		? getWorkDaysBetweenDates(today, nextPgcmDate)
		: 0;

	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-2 items-center">
						<div className="text-xs bg-neutral-200 px-2 py-1 rounded-xs min-w-[100px]">
							PGCM
						</div>
						<div>
							<span className="text-xxs">in</span>
							<span className="font-bold"> {` ${workdaysUntilNextPgcm} `}</span>
							<span className="text-xxs">days</span>
							<span className="text-xxs">
								{` (${nextPgcmDate?.toLocaleDateString()} ${nextPgcmDate?.toLocaleString("en-US", { weekday: "long" })})`}
							</span>
						</div>
					</div>
					<div className="flex flex-row gap-2 items-center">
						<div className="text-xs bg-neutral-200 px-2 py-1 rounded-xs min-w-[100px]">
							Weekly Review
						</div>
						<div>
							<span className="text-xxs">in </span>
							{workdaysUntilFriday} <span className="text-xxs">days</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
