export default function calendarArr(firstMonth: Date) {
    const cDate = new Date(
        firstMonth.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
    );
    const fDayCMonth = new Date(cDate.getFullYear(), cDate.getMonth(), 1);

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

    return month;
}
