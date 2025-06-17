import { promises as fs } from 'node:fs';
import xlsx from 'xlsx';
import path from 'node:path';
import process from 'node:process';

////constants
const projectsDir = await getProjectsDirectory();
const sheetName = 'timeline';
const SheetNamePGC = 'pgcms';

////run code
export async function dataLoader() {
	const excelFiles = await getExcelFiles(projectsDir);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const projects: { id: string; name: string; filePath: string; dates: any[] }[] = [];
	const pgcmDates = new Set<number>();
	for (const excel of excelFiles) {
		const { projectID, projectName } = getProjectIdName(excel);
		if (!projectID || !projectName) continue;
		const pjt = {
			id: projectID,
			name: projectName,
			filePath: excel,
			dates: await getTimeline(excel),
		};
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
	const filePath = path.join(executionPath, 'projectsDirectory.txt');

	try {
		// Check if the file exists by attempting to access it
		await fs.access(filePath);

		// Read the file content
		const content = await fs.readFile(filePath, 'utf-8');
		const firstLine = content.split(/\r?\n/)[0].trim();

		if (firstLine) {
			return firstLine;
		}
	} catch (err) {
		// File does not exist or is not accessible
	}

	// Fallback to default projects directory
	return path.join(executionPath, 'projects');
}

function getProjectIdName(filePath: string) {
	const fileName = filePath.split('\\');
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
	};
	for (const file of files) await storeXlsx(file, fileList);
	return fileList;
}

async function getTimeline(filePath: string) {
	const file = await fs.readFile(filePath);
	const workbook = xlsx.read(file);
	const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

	return data
		.filter((d: any) => Object.hasOwn(d, 'Due') && d.Due !== '-' && d.G !== 'G' && d.ST !== 'N/A')
		.map((row: any) => {
			const { G, Cat, ST, Task, Fn, Owner, Start, Due, DateST, Notes } = row;
			return { G, Cat, ST, Task, Fn, Owner, Start, Due, DateST, Notes };
		});
}

async function getPGCMdates(filePath: string) {
	const file = await fs.readFile(filePath);
	const workbook = xlsx.read(file);
	const data: { [key: string]: number | undefined }[] = xlsx.utils.sheet_to_json(workbook.Sheets[SheetNamePGC]);
	return data.reduce((acc: number[], curr: { [key: string]: number | undefined }) => {
		if (curr['-'] !== undefined) {
			acc.push(curr['-']);
		}
		return acc;
	}, [] as number[]);
}

function getTodaySerialNumber() {
	// Get today's date in Japan
	const todayInJapan = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
	const todayDate = new Date(todayInJapan);

	// Excel serial number for 1900-01-01 is 1
	const excelEpoch = new Date(Date.UTC(1899, 11, 30));
	const diffInTime = todayDate.getTime() - excelEpoch.getTime();
	const diffInDays = diffInTime / (1000 * 3600 * 24);
	return Math.floor(diffInDays);
}
