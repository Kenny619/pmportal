import type { Context } from "hono";
import { dataLoader } from "./dataLoader";

export async function fetchData(c: Context) {
    const data = await dataLoader();
    const d = new Date().toISOString();
    console.log(d, "dataLoader done");
    return c.json(data);
}