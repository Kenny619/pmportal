import type { Context } from "hono";
import { promises as fs } from "node:fs";
import xlsx from "xlsx";
import path from "node:path";
import process from "node:process";
import Xls from "./handler.excel.class.ts";

////constants
const sourceFileName = "projects.txt";
const projectsDir = await getProjectsDirectory();
const sheetName = "timeline";
const SheetNamePGC = "pgcms";

export async function fetchData(c: Context) {
    const xls = new Xls();
    const data = await xls.loadExcelData();
    return c.json(data);
}

export async function fetchData2(c: Context) {
    const data = await dataLoader();
    const d = new Date().toISOString();
    console.log(d, "dataLoader done");
    return c.json(data);
}


export async function verify(c: Context) {
    /*
    1. check if the file exists
    2. check if the file contains a valid path
    3. check if excel files exists under the path
    */

    let projectTxtContent = "";
    let projectSourcePath = "";
    let output = {
        projectPath: "",
        projectFilesVerified: false,
        isError: false,
        error: "",
    }

    const executionPath = process.cwd();
    const projectTxtPath = path.join(executionPath, sourceFileName);

    try {
        fs.access(projectTxtPath);
    } catch (e) {
        output.error = "missing project.txt";
        return c.json(output);
    }

    try {
        projectTxtContent = await fs.readFile(projectTxtPath, 'utf-8');
    } catch (e) {
        output.error = `Could not open ${projectTxtPath}`;
        return c.json(output);
    }

    try {
        projectSourcePath = projectTxtContent.split(/\r?\n/)[0].trim();
        //read directory, report the result.
    } catch (e) {

        output.error = `Could not open ${projectTxtPath}`;
        return c.json(output);
    }

}


////run code
export async function dataLoader() {
    const excelFiles = await getExcelFiles(projectsDir);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const projects: { id: string, name: string, filePath: string, dates: any[] }[] = [];
    const pgcmDates = new Set<number>();
    for (const excel of excelFiles) {
        const { projectID, projectName } = getProjectIdName(excel);
        if (!projectID || !projectName) continue;
        const pjt = {
            id: projectID,
            name: projectName,
            filePath: excel,
            dates: await getTimeline(excel)
        }
        const dates: number[] = await getPGCMdates(excel);
        for (const date of dates) {
            pgcmDates.add(date);
        }

        projects.push(pjt);

    }

    return { projects, pgcmDates: Array.from(pgcmDates) };
}




////functions

//get excel file repository
async function getProjectsDirectory(): Promise<string> {
    const executionPath = process.cwd();
    const filePath = path.join(executionPath, sourceFileName);

    try {
        // Check if the file exists by attempting to access it
        await fs.access(filePath);
        console.log({ filePath });

        // Read the file content
        const content = await fs.readFile(filePath, 'utf-8');
        const firstLine = content.split(/\r?\n/)[0].trim();

        if (firstLine) {
            return firstLine;
        }
    } catch (err) {
        // File does not exist or is not accessible
        console.log(`could not find ${filePath}`);
    }

    // Fallback to default projects directory
    return path.join(executionPath, 'projects');
}

//get project ID and project name from the file path
function getProjectIdName(filePath: string) {
    const fileName = filePath.split("\\");
    const projectID = fileName[fileName.length - 2].match(/(.*?) /)?.[1];
    const projectName = fileName[fileName.length - 2].match(/[a-zA-Z0-9]{7}-[a-zA-Z0-9]{4} (.*?)$/)?.[1];
    return { projectID, projectName };
}

//return an array of file paths of excelfiles residing under dir
async function getExcelFiles(dir: string, fileList: string[] = []) {
    const files = await fs.readdir(dir);
    const storeXlsx = async (fileName: string, fileList: string[]) => {
        const filePath = path.join(dir, fileName);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) await getExcelFiles(filePath, fileList);
        if (stat.isFile() && (filePath.endsWith('.xls') || filePath.endsWith('.xlsx'))) fileList.push(filePath);
    }
    for (const file of files) await storeXlsx(file, fileList);
    return fileList;
}


//Acquire timeline JSON data from excel file.
async function getTimeline(filePath: string) {
    const file = await fs.readFile(filePath);
    const workbook = xlsx.read(file);
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);


    const timeline = data
        .filter((d: any) => Object.hasOwn(d, "Due") && d.Due !== "-" && d.G !== "G" && d.ST !== "N/A")
        .map((row: any, index: number) => {
            const { G, Cat, ST, Task, Fn, Owner, Start, Due, DateST, Notes } = row;
            return { RowNum: index + 1, G, Cat, ST, Task, Fn, Owner, Start, Due, DateST, Notes };
        });


    return timeline;

}


async function getPGCMdates(filePath: string) {
    const file = await fs.readFile(filePath);
    const workbook = xlsx.read(file);
    const data: { [key: string]: number | undefined }[] = xlsx.utils.sheet_to_json(workbook.Sheets[SheetNamePGC]);
    return data.reduce((acc: number[], curr: { [key: string]: number | undefined }) => {
        if (curr["-"] !== undefined) {
            acc.push(curr["-"]);
        }
        return acc;
    }, [] as number[]);
}