/*
const colors: string[] = [
    // Set 1
    '#D6C68C', // Khaki
    '#8CE6E6', // Cyan
    '#C26C6C', // Maroon
    '#84D984', // Green
    '#5DAE8B', // Deep Green
    '#FFB266', // Orange
    '#A3B6E0', // Navy
    '#D9D9D9', // Gray
    '#FFF08A', // Yellow
    '#8FBFFF', // Blue
    '#C7A3E0', // Purple
    '#FFD966', // Gold
    '#B38C66', // Brown
    '#F7A6C1', // Pink
    '#6FD2C6', // Teal
    '#F27A7A', // Red

    // Set 2 (tonally close variants)
    '#58A67F', // Deep Green 2
    '#D1BE7F', // Khaki 2
    '#80DEDE', // Cyan 2
    '#BA6363', // Maroon 2
    '#7CD27C', // Green 2
    '#FFA64D', // Orange 2
    '#99AEDB', // Navy 2
    '#CCCCCC', // Gray 2
    '#FFEC66', // Yellow 2
    '#85B5F5', // Blue 2
    '#BD97DA', // Purple 2
    '#FFC84D', // Gold 2
    '#A87F59', // Brown 2
    '#F499B8', // Pink 2
    '#64C9BD', // Teal 2
    '#EB6F6F', // Red 2
    // Set 3 (slightly softer or cooler variants)
    '#52A072', // Deep Green 3
    '#CBB672', // Khaki 3
    '#74D1D1', // Cyan 3
    '#AD5959', // Maroon 3
    '#73CB73', // Green 3
    '#FF9933', // Orange 3
    '#8EA4D6', // Navy 3
    '#C0C0C0', // Gray 3
    '#FFE94D', // Yellow 3
    '#7AABEB', // Blue 3
    '#B38AD3', // Purple 3
    '#FFBC33', // Gold 3
    '#9C7350', // Brown 3
    '#F28DAC', // Pink 3
    '#5FC1B3', // Teal 3
    '#E56363'  // Red 3
];
*/
export interface Timeline {
    TaskId?: string;
    Stage: string;
    Category: string;
    Status: string;
    TaskName: string;
    Function?: string;
    OwnerName?: string;
    StartDate?: number;
    DueDate?: number;
    Notes?: string;
    DateStatus?: string;
}
export type WbsJSON = {
    id: string;
    name: string;
    filePath: string;
    color?: string;
    dates: Timeline[]
}[];

export interface TaskByDate extends Timeline {
    Color: string;
    ProjectName: string;
    ProjectId: string;
};

export type WbsByDate = {
    [key: string]: TaskByDate[];
}
export type Filter = {
    G: string[];
    pjtName: string[];
    idName: string[];
    Fn: string[];
    Owner: string[];
    DateST: string[];
    Status: string[];
}
export class WBS {
    wbs: WbsJSON;
    dateWbs: WbsByDate;
    color: string[];
    filter: Filter;

    constructor(wbsData: WbsJSON) {
        this.wbs = wbsData;
        this.dateWbs = {} as WbsByDate;
        this.color = colors;
        this.filter = {
            G: [],
            pjtName: [],
            idName: [],
            Fn: [],
            Owner: [],
            DateST: [],
            Status: [],
        }
    }

    groupByDate() {
        this.dateWbs = {} as WbsByDate;
        for (const file of this.wbs) {
            for (const task of file.dates) {
                if (!task.DueDate) continue;
                this.dateWbs[task.DueDate] = [...(this.dateWbs[task.DueDate] || []), {
                    Color: file.color as string,
                    TaskId: task.TaskId,
                    ProjectName: file.name,
                    ProjectId: file.id,
                    Stage: task.Stage,
                    Category: task.Category,
                    TaskName: task.TaskName,
                    Status: task.Status,
                    Function: task.Function,
                    OwnerName: task.OwnerName,
                    StartDate: task.StartDate,
                    DueDate: task.DueDate,
                    Notes: task.Notes,
                    DateStatus: task.DateStatus,
                }]
            }
        }
    }

    setColor() {
        for (const wbs of this.wbs) {
            // const i = Math.floor(Math.random() * this.color.length);
            // const color = this.color.splice(i, 1)[0];
            wbs.color = this.color.shift() as string;
        }
    }

    getWBS() {
        return this.wbs;
    }

    getDateWBS() {
        this.setColor();
        this.groupByDate();
        return this.dateWbs;
    }

    getFilter() {
        for (const date in this.dateWbs) {
            for (const wbs of this.dateWbs[date]) {
                for (const [key, value] of Object.entries(wbs)) {
                    if (!this.filter[key as keyof Filter].includes(value as string)) {
                        this.filter[key as keyof Filter].push(value as string);
                    }
                }
            }
        }
        return this.filter;
    }
}

