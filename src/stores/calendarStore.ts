import { create } from 'zustand'
import { CalendarDate } from './calendarStoreClass';

export type CalendarViewState = {
    view: boolean;
    setView: (newView: boolean) => void;
}

export const calendarViewStore = create<CalendarViewState>((set) => ({
    view: false,
    setView: (newView: boolean) => set(() => ({ view: newView })),
}));


/////////////////////// date navigation 

//instanciate EventDate and adjust starting date to the nearest working date
const ed = new CalendarDate();
ed.adjustWorkDay();

export type DateNavState = {
    startDay: Date;
    startMonth: Date;
    nextFiveDays: Date[];
    incDay: () => void;
    decDay: () => void;
    setDate: (newDate: Date) => void;
    reset: () => void;
    incMonth: () => void;
    decMonth: () => void;

}

export const dateNavStore = create<DateNavState>((set) => ({
    startDay: ed.getDate(),
    nextFiveDays: ed.getFiveDays(),
    incDay: () => {
        ed.setFiveWorkDaysLater();
        set(() => ({
            startDay: ed.getDate(),
            nextFiveDays: ed.getFiveDays(),
        }));
    },
    decDay: () => {
        ed.setFiveWorkDaysAgo();
        set(() => ({
            startDay: ed.getDate(),
            nextFiveDays: ed.getFiveDays(),
        }));
    },
    setDate: (newDate: Date) => {
        ed.setDate(newDate);
        set(() => ({
            startDay: ed.getDate(),
            nextFiveDays: ed.getFiveDays(),
            startMonth: ed.getMonth(),
        }));
    },
    reset: () => {
        ed.resetDate();
        set(() => ({ startDay: ed.getDate(), nextFiveDays: ed.getFiveDays(), startMonth: ed.getMonth() }));
    },
    startMonth: ed.getMonth(),
    incMonth: () => {
        ed.incrementMonth();
        set(() => ({
            startMonth: ed.getMonth(),
        }));
    },
    decMonth: () => {
        ed.decrementMonth();
        set(() => ({
            startMonth: ed.getMonth(),
        }));
    },
}));


/////////////////////// month view store


export type showCalendarState = {
    showCalendar: boolean;
    date: Date;
    displayCalendar: () => void;
    setDate: (newDate: Date) => void;
}

export const showCalendarStore = create<showCalendarState>((set) => ({
    showCalendar: false,
    date: new Date(),
    displayCalendar: () => set((state) => ({ showCalendar: !state.showCalendar })),
    setDate: (newDate: Date) => set(() => ({ date: newDate })),
}));



