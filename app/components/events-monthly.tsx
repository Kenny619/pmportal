import holidays from "date-holidays";
export default function EventsMonthly() {
	const cDate = new Date(
		new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
	);
	const fDayCMonth = new Date(cDate.getFullYear(), cDate.getMonth(), 1);
	const fDayNMonth = new Date(cDate.getFullYear(), cDate.getMonth() + 1, 1);

	const lDayCMonth = new Date(
		cDate.getFullYear(),
		cDate.getMonth() + 1,
		0,
	).getDate();

	const lDayNMonth = new Date(
		cDate.getFullYear(),
		cDate.getMonth() + 2,
		0,
	).getDate();

	const curMonthDoW = fDayCMonth.getDay();

	let week = [];
	const month = [];

	//preceding empty cells
	if (curMonthDoW !== 0) {
		for (let i = 0; i < curMonthDoW; i++) {
			week.push(null);
		}
	}

	//current month
	for (let i = 1; i <= lDayCMonth; i++) {
		if (week.length === 7) {
			month.push(week);
			week = [];
		}
		const d = new Date(cDate.getFullYear(), cDate.getMonth(), i);
		week.push(d);
	}

	//next month
	for (let i = 1; i <= lDayNMonth; i++) {
		if (week.length === 7) {
			month.push(week);
			week = [];
		}
		const d = new Date(cDate.getFullYear(), cDate.getMonth() + 1, i);
		week.push(d);
	}

	//trailing empty cells
	while (week.length < 7) {
		week.push(null);
	}
	month.push(week);

	//calendar cell css
	const layout =
		"p-1 flex items-start justify-start min-h-[120px] w-1/7 shadow-xs text-xxxs";
	const cssDayoff = `bg-pink-100 text-red-500 ${layout} `;
	const cssCMonth = `bg-white ${layout}`;
	const cssNMonth = `bg-neutral-50 ${layout}`;

	//holiday
	const hd = new holidays("JP");

	return (
		<div className="w-full flex flex-col my-2">
			{month.map((week: (Date | null)[], index: number) => (
				<div key={`week-${index}`} className="flex justify-between gap-1 mb-1">
					{week.map((day: Date | null) => (
						<div
							key={`${day?.getFullYear()}-${day?.getMonth()}-${day?.getDate()}`}
							className={
								day === null && index === 0
									? cssCMonth
									: day === null && index > 0
										? cssNMonth
										: day !== null && hd.isHoliday(day as Date)
											? cssDayoff
											: day?.getDay() === 0 || day?.getDay() === 6
												? cssDayoff
												: day?.getMonth() === cDate.getMonth()
													? cssCMonth
													: cssNMonth
							}
						>
							<span
								className={
									day?.toDateString() === new Date().toDateString()
										? "font-bold py-1 px-2 rounded-full bg-black text-white"
										: ""
								}
							>
								{day?.getDate()}
							</span>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
