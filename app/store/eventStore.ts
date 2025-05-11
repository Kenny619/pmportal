import { create } from 'zustand'
import holidays from "date-holidays";
import { EventDate } from './eventStoreClass';

export type EventViewState = {
    view: boolean;
    setView: (newView: boolean) => void;
}

export const eventViewStore = create<EventViewState>((set) => ({
    view: false,
    setView: (newView: boolean) => set(() => ({ view: newView })),
}));

export type showMonthState = {
    cMonth: Date;
    nMonth: Date;
    incMonth: () => void;
    decMonth: () => void;
    setMonth: (newMonth: Date) => void;
    resetMonth: () => void;
}
export const showMonthStore = create<showMonthState>((set) => ({
    cMonth: new Date(),
    nMonth: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    incMonth: () => set((state) => ({ cMonth: new Date(state.cMonth.setMonth(state.cMonth.getMonth() + 1)) })),
    decMonth: () => set((state) => ({ cMonth: new Date(state.cMonth.setMonth(state.cMonth.getMonth() - 1)) })),
    setMonth: (newMonth: Date) => set(() => ({ cMonth: newMonth })),
    resetMonth: () => set(() => ({ cMonth: new Date() })),
}));


/////////////////////// day view 

//instanciate EventDate
const ed = new EventDate();
//adjust workday
ed.adjustWorkDay();

export type showDayState = {
    startDay: Date;
    nextFiveDays: Date[];
    incDay: () => void;
    decDay: () => void;
    setDay: (newDay: Date) => void;
    resetDay: () => void;
}

export const showDayStore = create<showDayState>((set) => ({
    startDay: ed.getDate(),
    nextFiveDays: ed.getFiveDays(),
    incDay: () => {
        ed.setFiveWorkDaysLater();
        set((state) => ({
            startDay: ed.getDate(),
            nextFiveDays: ed.getFiveDays(),
        }));
    },
    decDay: () => {
        ed.setFiveWorkDaysAgo();
        set((state) => ({
            startDay: ed.getDate(),
            nextFiveDays: ed.getFiveDays(),
        }));
    },
    setDay: (newDay: Date) => {
        ed.setDate(newDay);
        set((state) => ({
            startDay: ed.getDate(),
            nextFiveDays: ed.getFiveDays(),
        }));
    },
    resetDay: () => set(() => ({ startDay: new Date(), nextFiveDays: ed.getFiveDays() })),
}));