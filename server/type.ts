
export type WbsJSON = {
    id: string;
    name: string;
    filePath: string;
    color?: string;
    dates: {
        G: string;
        CAT: string;
        ST: string;
        Task: string;
        Fn?: string;
        Owner?: string;
        Start?: number
        Due?: number;
        Notes?: string;
        DateST?: string;
    }[]
}[];

export type Task = {
    color: string;
    id: string;
    idName: string;
    pjtName: string;
    G: string;
    Task: string;
    Status?: string;
    Fn?: string;
    Owner?: string;
    Start?: number;
    Due?: number;
    Notes?: string;
    DateST?: string;
};

export type WbsByDate = {
    [key: string]: Task[];
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