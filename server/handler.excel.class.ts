import type { WbsJSON, WbsByDate, XlsOutput } from './type.ts';
import { promises as fs } from 'node:fs';
import xlsx from 'xlsx';
import path from 'node:path';
import process from 'node:process';
import { colors } from './colors.ts';


////constants
const sourceFileName = 'projects.txt';
const projectsRepoPath = await getProjectsDirectory();
const sheetNameTimeline = 'timeline';
const sheetNamePGC = 'pgcms';

class Xls {
	repositoryPath: string; //path to the excel file repository
	excelFilePaths: string[]; //list of excel file paths
	excelFileObj: {}[]; // file objects of each excel file
	projectsJSON: WbsJSON; //JSON object of projects
	datesJSON: WbsByDate; //JSON object of dates
	pgcmDates: Set<number>; //unique set of pgcm dates in excel date number format
	excelSheetsObj: { [key: string]: any }[]; //excel sheets objects

	constructor() {
		if (!projectsRepoPath) throw new Error('projects directory not found');
		this.repositoryPath = projectsRepoPath;
		this.projectsJSON = [];
		this.pgcmDates = new Set<number>();
		this.datesJSON = {};
		this.excelFilePaths = [];
		this.excelFileObj = [];
		this.excelSheetsObj = [];
	}

	async loadExcelData() {
		await this.getExcelFilePaths();
		await this.getExcelFileObj();

		const projectIdName = this.getProjectIdName();
		await this.getExcelSheetsObj([sheetNameTimeline, sheetNamePGC]);

		const output: XlsOutput = { projects: [], wbsByDate: {}, pgcmDates: [] };

		for (const { timeline, pgcm } of this.excelSheetsObj) {
			const { ProjectId, ProjectName } = projectIdName.shift() || { ProjectId: "unknown id", ProjectName: "unknown project" };
			output.projects.push({
				ProjectId,
				ProjectName,
				Tasks: await this.getTimeline(timeline)
			});

			const wbsByDate = await this.getWbsByDate(ProjectName, ProjectId, timeline);
			for (const date in wbsByDate) {
				if (output.wbsByDate[date]) {
					output.wbsByDate[date].push(...wbsByDate[date]);
				} else {
					output.wbsByDate[date] = wbsByDate[date];
				}
			}

			const pgcmDates = await this.getPGCMdates(pgcm);
			pgcmDates.forEach(date => this.pgcmDates.add(date));
		}

		output.pgcmDates = Array.from(this.pgcmDates);
		return output;
	}


	async getPGCMdates(workSheetObj: {}) {
		const dates: { [key: string]: number | undefined }[] = xlsx.utils.sheet_to_json(workSheetObj);
		return dates.reduce((acc: number[], curr: { [key: string]: number | undefined }) => {
			if (curr["-"] !== undefined) {
				if (!acc.includes(curr["-"])) acc.push(curr["-"]);
			}
			return acc;
		}, [] as number[]);
	}

	async getTimeline(workSheetObj: {}) {
		const data = xlsx.utils.sheet_to_json(workSheetObj);

		return data
			.filter((d: any) => Object.hasOwn(d, "Due") && d.Due !== "-" && d.G !== "G" && d.ST !== "N/A")
			.map((row: any, index: number) => {
				const { G, Cat, ST, Task, Fn, Owner, Start, Due, DateST, Notes } = row;
				return { id: index + 1, Stage: G, Category: Cat, Status: ST, TaskName: Task, Function: Fn, OwnerName: Owner, StartDate: Start, DueDate: Due, DateStatus: DateST, Notes };
			});
	}

	async getWbsByDate(ProjectName: string, ProjectId: string, timelineObjects: { [key: string]: any }[]) {
		const wbsByDate: WbsByDate = {};
		for (const row of timelineObjects) {
			const { DateST, G, Task, ST, Fn, Owner, Start, Due, Notes, Cat } = row;
			if (DateST && G && Task && ST) {
				wbsByDate[Due].push({
					TaskId: row.id, Stage: G, Category: Cat, TaskName: Task, Status: ST, Function: Fn, OwnerName: Owner, StartDate: Start, DueDate: Due, Notes,
					Color: colors.shift() || "gray", ProjectId, ProjectName, DateStatus: DateST
				});
			}
		}
		return wbsByDate;
	}

	async getExcelSheetsObj(sheetNames: string[]) {
		const excelSheetsObj = this.excelFileObj.map(async (file) => {
			const workbook = xlsx.read(file);
			let sheetObj = {};
			for (const sheetName of sheetNames) {
				const sheet = workbook.Sheets[sheetName];
				sheetObj[sheetName] = sheet;
			}
			return sheetObj;
		});
		this.excelSheetsObj = await Promise.all(excelSheetsObj);
	}

	async getExcelFileObj() {
		const excelFileObj = this.excelFilePaths.map(async (filePath) => {
			try {
				const file = await fs.readFile(filePath);
				return file;
			} catch (err) {
				console.log(`could not read ${filePath} ${err}`);
				throw new Error(`could not read ${filePath} ${err}`);
			}
		});
		this.excelFileObj = await Promise.all(excelFileObj);
	}

	async getExcelFilePaths() {
		const findExcelFiles = async (repoPath: string, excelFilePaths: string[]) => {
			const storeExcelFilePaths = async (direntName: string, fileList: string[]) => {
				const direntPath = path.join(repoPath, direntName);
				const stat = await fs.stat(direntPath);
				if (stat.isDirectory()) await findExcelFiles(direntPath, fileList);
				else if (stat.isFile() && (direntPath.endsWith('.xls') || direntPath.endsWith('.xlsx'))) fileList.push(direntPath);
			};

			const files = await fs.readdir(repoPath);
			for (const file of files) await storeExcelFilePaths(file, excelFilePaths);
			return excelFilePaths;
		};
		const excelFilePaths: string[] = [];
		this.excelFilePaths = await findExcelFiles(this.repositoryPath, excelFilePaths);
		return this.excelFilePaths;
	}

	getProjectIdName() {
		const projectIdName = this.excelFilePaths.map((filePath) => {
			const fileName = filePath.split("\\");
			const ProjectId = fileName[fileName.length - 2].match(/(.*?) /)?.[1] || "unknown project";
			const ProjectName = fileName[fileName.length - 2].match(/[a-zA-Z0-9]{7}-[a-zA-Z0-9]{4} (.*?)$/)?.[1] || "unknown project";
			return { ProjectId, ProjectName };
		});
		return projectIdName;
	}
}

//get excel file repository
async function getProjectsDirectory(): Promise<string | undefined> {
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
		console.log(`could not find ${filePath}`);
		throw new Error(`could not find ${filePath}`);
	}

}

export default Xls;