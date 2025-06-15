import { useQuery } from "@tanstack/react-query";
import { wbsStore, type WbsState } from "@/stores/wbsStore";
// import { WBS } from "@/lib/etlWBS";
import { useEffect } from "react";
import type { WbsByDate, WbsJSON } from "@/types/type";

type WBSResponse = {
	projects: WbsJSON;
	wbsByDate: WbsByDate;
	pgcmDates: number[];
};

export function useFetchWBS() {
	const stWbs = wbsStore((state: WbsState) => state.wbs);
	const stPgcm = wbsStore((state: WbsState) => state.pgcm);
	const setPgcms = wbsStore((state: WbsState) => state.setPgcms);
	const setWbsOriginal = wbsStore((state: WbsState) => state.setWbsOriginal);
	const setWbs = wbsStore((state: WbsState) => state.setWbs);
	const createFilter = wbsStore((state: WbsState) => state.createFilter);
	const setProjects = wbsStore((state: WbsState) => state.setProjects);

	const queryKey = ["WBSdata"];
	const queryFn = async () => {
		const res = await fetch("http://localhost:8888/load/");
		return await res.json() as WBSResponse;
	};

	const { data, isLoading } = useQuery({
		queryKey,
		queryFn,
		enabled: Object.keys(stWbs).length === 0 || stPgcm.length === 0, // Only fetch if WBS or PGCM is empty
		staleTime: Number.POSITIVE_INFINITY, // Never consider the data stale
		gcTime: Number.POSITIVE_INFINITY, // Keep data in cache indefinitely
	});

	useEffect(() => {
		if (data) {
			const { projects, wbsByDate, pgcmDates } = data;
			// Only update WBS if it's empty
			if (Object.keys(stWbs).length === 0) {
				setProjects(projects);
				setWbsOriginal(wbsByDate);
				setWbs(wbsByDate);
				createFilter(wbsByDate);
				setPgcms(pgcmDates);
			}
		}
	}, [data, setWbs, setWbsOriginal, createFilter, setPgcms, stWbs, setProjects]);

	return isLoading;
}
