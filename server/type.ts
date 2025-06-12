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
    ProjectId: string;
    ProjectName: string;
    Tasks: Timeline[]
}[];

export interface TaskByDate extends Timeline {
    Color: string;
    ProjectName: string;
    ProjectId: string;
};

export type WbsByDate = {
    [key: string]: TaskByDate[];
}


export type XlsOutput = {
    projects: WbsJSON,
    wbsByDate: WbsByDate,
    pgcmDates: number[]
}