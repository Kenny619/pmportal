import type { Context } from "hono";
import Xls from "./handler.excel.class.ts";

export async function fetchData(c: Context) {
    const xls = new Xls();
    const data = await xls.loadExcelData();
    console.log(new Date().toISOString(), "fetchData done");
    return c.json(data);
}



// export async function verify(c: Context) {
//     /*
//     1. check if the file exists
//     2. check if the file contains a valid path
//     3. check if excel files exists under the path
//     */

//     let projectTxtContent = "";
//     let projectSourcePath = "";
//     let output = {
//         projectPath: "",
//         projectFilesVerified: false,
//         isError: false,
//         error: "",
//     }

//     const executionPath = process.cwd();
//     const projectTxtPath = path.join(executionPath, sourceFileName);

//     try {
//         fs.access(projectTxtPath);
//     } catch (e) {
//         output.error = "missing project.txt";
//         return c.json(output);
//     }

//     try {
//         projectTxtContent = await fs.readFile(projectTxtPath, 'utf-8');
//     } catch (e) {
//         output.error = `Could not open ${projectTxtPath}`;
//         return c.json(output);
//     }

//     try {
//         projectSourcePath = projectTxtContent.split(/\r?\n/)[0].trim();
//         //read directory, report the result.
//     } catch (e) {

//         output.error = `Could not open ${projectTxtPath}`;
//         return c.json(output);
//     }

// }

