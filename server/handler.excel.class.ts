import type { Task, WbsJSON, WbsByDate } from './type.ts';
import { promises as fs } from 'node:fs';
import xlsx from 'xlsx';
import path from 'node:path';
import process from 'node:process';

////constants
const sourceFileName = 'projects.txt';
const projectsDir = await getProjectsDirectory();
const sheetName = 'timeline';
const SheetNamePGC = 'pgcms';

class Xls {
	repositoryPath: string;
	excelFilePaths: string[];
	projectsJSON: WbsJSON;
	datesJSON: WbsByDate;
	pgcmDates: Set<number>;

	constructor(repositoryPath: string) {
		this.repositoryPath = repositoryPath;
		this.projectsJSON = [];
		this.pgcmDates = new Set<number>();
		this.datesJSON = {};
	}

	async loadExcels() {
		const getExcelFilePaths = async (repoPath: string, excelFilePaths: string[]) => {
			const storeXlsx = async (direntName: string, fileList: string[]) => {
				const direntPath = path.join(repoPath, direntName);
				const stat = await fs.stat(direntPath);
				if (stat.isDirectory()) await getExcelFilePaths(direntPath, fileList);
				else if (stat.isFile() && (direntPath.endsWith('.xls') || direntPath.endsWith('.xlsx'))) fileList.push(direntPath);
			};

			const files = await fs.readdir(repoPath);
			for (const file of files) await storeXlsx(file, excelFilePaths);
			return excelFilePaths;
		};
		const excelFilePaths: string[] = [];
		return getExcelFilePaths(this.repositoryPath, excelFilePaths);
	}
}

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
