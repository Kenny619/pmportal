import holidays from "date-holidays";
export class EventDate {
    private hd: holidays;
    private d: Date;
    private fiveDays: Date[];

    constructor() {
        this.hd = new holidays("JP");
        this.d = new Date();
        this.fiveDays = [];
    }

    //validate whether the day is a workday
    adjustWorkDay() {
        let d = new Date(this.d);
        while (d.getDay() === 0 || d.getDay() === 6 || this.hd.isHoliday(d)) {
            d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
        }

        this.d = d;
    }

    private setWorkDay(day: Date, mode: "next" | "prev" = "next") {
        let d = new Date(day);

        while (d.getDay() === 0 || d.getDay() === 6 || this.hd.isHoliday(d)) {
            d = mode === "next" ? new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1) : new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        }
        return d;
    }

    setFiveWorkDaysAgo() {
        for (let i = 0; i < 5; i++) {
            this.d = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() - 1);
            this.d = this.setWorkDay(this.d, "prev");
        }
    }

    setFiveWorkDaysLater() {
        for (let i = 0; i < 5; i++) {
            this.d = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() + 1);
            this.d = this.setWorkDay(this.d, "next");
        }
    }

    setToday() {
        this.d = new Date();
    }

    setDate(day: Date) {
        this.d = day;
    }

    getFiveDays() {
        this.fiveDays = [];
        let day = this.d;
        while (this.fiveDays.length < 5) {
            day = this.setWorkDay(day);
            this.fiveDays.push(day);
            day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
        }
        return this.fiveDays;
    }

    getDate() {
        return this.d;
    }

}