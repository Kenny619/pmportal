import holidays from "date-holidays";



const closestWorkDay = (day: Date) => {
    const hd = new holidays("JP");
    let d = new Date(day);

    while (d.getDay() === 0 || d.getDay() === 6 || hd.isHoliday(d)) {
        // d.setDate(d.getDate() + 1);
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
    return d;
}

const getFiveWorkDaysAgo = (day: Date) => {
    const hd = new holidays("JP");
    const d = new Date(day)
    for (let i = 0; i < 5; i++) {
        while (d.getDay() === 0 || d.getDay() === 6 || hd.isHoliday(d)) {
            d.setDate(d.getDate() - 1);
        }
        d.setDate(d.getDate() - 1);
    }
    return d;
}

//get 5 workdays from startDay
function getNextFiveDays(day: Date) {
    const fiveDays = [];
    let d = new Date(day);
    while (fiveDays.length < 5) {
        fiveDays.push(closestWorkDay(d));
        d = closestWorkDay(d);
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

    }
    return fiveDays;
}

function getStartDay(day: Date) {
    const d = new Date(day);
    return closestWorkDay(d);
}

function getNextWorkDay(day: Date) {
    const d = new Date(day);
    d.setDate(d.getDate() + 1);
    return closestWorkDay(d);
}


//runcode
const hd = new holidays("JP");

const d = new Date();
const nextWorkDay = closestWorkDay(d);
console.log({ nextWorkDay: nextWorkDay.toLocaleString() });

const fiveWorkDaysAgo = getFiveWorkDaysAgo(nextWorkDay);
console.log({ fiveWorkDaysAgo: fiveWorkDaysAgo.toLocaleString() });

const prevFiveDays = getNextFiveDays(fiveWorkDaysAgo);
console.log({ prevFiveDays: prevFiveDays.map(d => d.toLocaleString()) });
