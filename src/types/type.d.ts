export interface Timeline {
    TaskId?: number;
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

export type Project = {
    ProjectId: string;
    ProjectName: string;
    Tasks: Timeline[];
}

export type WbsJSON = Project[];

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

export type Filter = {
    Stage: string[];
    Category: string[];
    ProjectName: string[];
    Status: string[];
    TaskName: string[];
    Function: string[];
    Owner: string[];
    StartDate: string[];
    DateStatus: string[];
}