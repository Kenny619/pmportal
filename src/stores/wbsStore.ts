import type { Task, WbsByDate } from "@/lib/etlWBS";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Filter = {
    G: string[];
    pjtName: string[];
    Fn: string[];
    Owner: string[];
    DateST: string[];
    Status: string[];
}

export type WbsState = {
    wbs: WbsByDate;
    wbsOriginal: WbsByDate;
    setWbs: (wbs: WbsByDate) => void;
    setWbsOriginal: (wbs: WbsByDate) => void;
    pgcm: number[];
    setPgcms: (newPgcms: number[]) => void;
    defaultFilter: Filter;
    currentFilter: Filter;
    createFilter: (wbsByDate: WbsByDate) => void;
    updateFilter: (groupKey: keyof Filter, selectedValue: string) => void;
    selectGroupFilter: (groupKey: keyof Filter) => void;
    clearGroupFilter: (groupKey: keyof Filter) => void;
    selectAllFilter: () => void;
    clearAllFilter: () => void;
    resetFilter: () => void;
}

export const wbsStore = create<WbsState>()(
    persist(
        (set) => ({
            wbs: {} as WbsByDate,
            wbsOriginal: {} as WbsByDate,
            setWbs: (wbs: WbsByDate) => set({ wbs }),
            setWbsOriginal: (wbsOriginal: WbsByDate) => set({ wbsOriginal }),

            pgcm: [],
            setPgcms: (newPgcms: number[]) => set(() => ({ pgcm: newPgcms })),

            defaultFilter: {
                G: [],
                pjtName: [],
                Fn: [],
                Owner: [],
                DateST: [],
                Status: [],
            },

            currentFilter: {
                G: [],
                pjtName: [],
                Fn: [],
                Owner: [],
                DateST: [],
                Status: [],
            },

            createFilter: (wbsByDate: WbsByDate) => {
                set((state: WbsState) => {
                    const G = new Set<string>();
                    const pjtName = new Set<string>();
                    const Fn = new Set<string>();
                    const Owner = new Set<string>();
                    const DateST = new Set<string>();
                    const Status = new Set<string>();
                    const newFilter = { G, pjtName, Fn, Owner, DateST, Status };
                    //asses by date
                    for (const key in wbsByDate) {
                        //asses by task
                        for (const taskObj of wbsByDate[key as unknown as keyof WbsByDate]) {
                            //assess by task key
                            for (const taskKey in taskObj) {
                                if (!Object.keys(state.defaultFilter).includes(taskKey as keyof Filter)) continue;

                                //if the task key is not a string, skip
                                if (typeof taskObj[taskKey as keyof Task] !== 'string') continue;

                                //if the task key is not in the default filter, add it
                                newFilter[taskKey as keyof Filter].add(taskObj[taskKey as keyof Task] as string);
                            }
                        }
                    }

                    const defaultFilter = { G: [...Array.from(newFilter.G).sort()], pjtName: [...Array.from(newFilter.pjtName).sort()], Fn: [...Array.from(newFilter.Fn).sort()], Owner: [...Array.from(newFilter.Owner).sort()], DateST: [...Array.from(newFilter.DateST).sort()], Status: [...Array.from(newFilter.Status).sort()] };
                    const currentFilter = {
                        G: [...Array.from(newFilter.G).sort()],
                        pjtName: [...Array.from(newFilter.pjtName).sort()],
                        Fn: [...Array.from(newFilter.Fn).sort()],
                        Owner: [...Array.from(newFilter.Owner).sort()],
                        DateST: [...Array.from(newFilter.DateST).sort()],
                        Status: [...Array.from(newFilter.Status).sort()],
                    };
                    //N/A
                    currentFilter.Status = currentFilter.Status.filter(value => value !== "N/A");
                    //duplicate the default filter to the current filter
                    return {
                        ...state,
                        defaultFilter,
                        currentFilter,
                    }
                })
            },

            updateFilter: (groupKey: keyof Filter, selectedValue: string) => {
                set((state: WbsState) => {
                    const currentValues = state.currentFilter[groupKey];
                    const newValues = currentValues.includes(selectedValue)
                        ? currentValues.filter(value => value !== selectedValue)
                        : [...currentValues, selectedValue];
                    const newFilter = {
                        ...state.currentFilter,
                        [groupKey]: newValues
                    };

                    return {
                        ...state,
                        wbs: applyFilter(state.wbsOriginal, newFilter),
                        currentFilter: newFilter
                    };
                });
            },

            selectGroupFilter: (groupKey: keyof Filter) => {
                set((state: WbsState) => {
                    const newFilter = {
                        ...state.currentFilter,
                        [groupKey]: [...state.defaultFilter[groupKey as keyof Filter]]
                    }
                    return {
                        ...state,
                        wbs: applyFilter(state.wbsOriginal, newFilter),
                        currentFilter: newFilter
                    }
                })
            },

            clearGroupFilter: (groupKey: keyof Filter) => {
                set((state: WbsState) => {
                    const newFilter = {
                        ...state.currentFilter,
                        [groupKey]: []
                    }
                    return {
                        ...state,
                        wbs: applyFilter(state.wbsOriginal, newFilter),
                        currentFilter: newFilter
                    }
                })
            },

            selectAllFilter: () => {
                set((state: WbsState) => {
                    const newFilter = {
                        G: [...state.defaultFilter.G],
                        pjtName: [...state.defaultFilter.pjtName],
                        Fn: [...state.defaultFilter.Fn],
                        Owner: [...state.defaultFilter.Owner],
                        DateST: [...state.defaultFilter.DateST],
                        Status: [...state.defaultFilter.Status],
                    }
                    return {
                        ...state,
                        currentFilter: newFilter,
                        wbs: applyFilter(state.wbs, newFilter)
                    }
                })
            },

            clearAllFilter: () => {
                set((state: WbsState) => {
                    const newFilter = {
                        G: [],
                        pjtName: [],
                        Fn: [],
                        Owner: [],
                        DateST: [],
                        Status: [],
                    }
                    return {
                        ...state,
                        currentFilter: newFilter,
                        wbs: applyFilter(state.wbs, newFilter)
                    }
                })
            },

            resetFilter: () => set((state: WbsState) => {
                const newFilter = {
                    G: [...state.defaultFilter.G],
                    pjtName: [...state.defaultFilter.pjtName],
                    Fn: [...state.defaultFilter.Fn],
                    Owner: [...state.defaultFilter.Owner],
                    DateST: [...state.defaultFilter.DateST],
                    Status: [...state.defaultFilter.Status],
                }
                return {
                    ...state,
                    currentFilter: newFilter,
                    wbs: applyFilter(state.wbs, newFilter)
                }
            }),
        }),
        {
            name: 'wbs-storage', // unique name for localStorage
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                wbs: state.wbs,
                wbsOriginal: state.wbsOriginal,
                defaultFilter: state.defaultFilter,
                currentFilter: state.currentFilter,
                pgcm: state.pgcm
            }), // only persist these fields
        }
    )
);

export function applyFilter(wbsByDate: WbsByDate, filter: Filter) {
    const filtered: WbsByDate = {};

    for (const [date, tasks] of Object.entries(wbsByDate)) {
        for (const task of tasks) {
            let flg = true;
            const taskKeys = ["G", "pjtName", "Fn", "Owner", "DateST", "Status"];
            for (const taskKey of taskKeys) {
                if (task[taskKey as keyof Task] === undefined) continue;
                if (!filter[taskKey as keyof Filter].includes(task[taskKey as keyof Task] as string) ||
                    filter[taskKey as keyof Filter].length === 0
                ) {
                    flg = false;
                    break;
                }

            }
            if (flg) filtered[date as unknown as keyof WbsByDate] = [...(filtered[date as unknown as keyof WbsByDate] || []), task];
        }
    }
    return filtered;
}

