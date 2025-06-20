export default {
	tasks: [
		{ id: 1, text: "Office itinerancy", type: "project", start_date: "02-04-2025 00:00", duration: 17, progress: 0.4, owner: [{ resource_id: "5", value: 3 }], parent: 0 },
		{ id: 2, text: "Office facing", type: "project", start_date: "02-04-2025 00:00", duration: 8, progress: 0.6, owner: [{ resource_id: "5", value: 4 }], parent: "1" },
		{ id: 3, text: "Furniture installation", type: "project", start_date: "11-04-2025 00:00", duration: 8, parent: "1", progress: 0.6, owner: [{ resource_id: "5", value: 2 }] },
		{ id: 4, text: "The employee relocation", type: "project", start_date: "13-04-2025 00:00", duration: 5, parent: "1", progress: 0.5, owner: [{ resource_id: "5", value: 4 }], priority: 3 },
		{ id: 5, text: "Interior office", type: "task", start_date: "03-04-2025 00:00", duration: 7, parent: "2", progress: 0.6, owner: [{ resource_id: "6", value: 5 }], priority: 1 },
		{ id: 6, text: "Air conditioners check", type: "task", start_date: "03-04-2025 00:00", duration: 7, parent: "2", progress: 0.6, owner: [{ resource_id: "7", value: 1 }], priority: 2 },
		{ id: 7, text: "Workplaces preparation", type: "task", start_date: "12-04-2025 00:00", duration: 8, parent: "3", progress: 0.6, owner: [{ resource_id: "10", value: 2 }] },
		{ id: 8, text: "Preparing workplaces", type: "task", start_date: "14-04-2025 00:00", duration: 5, parent: "4", progress: 0.5, owner: [{ resource_id: "10", value: 4 }, { resource_id: "9", value: 5 }], priority: 1 },
		{ id: 9, text: "Workplaces importation", type: "task", start_date: "21-04-2025 00:00", duration: 4, parent: "4", progress: 0.5, owner: [{ resource_id: "7", value: 3 }] },
		{ id: 10, text: "Workplaces exportation", type: "task", start_date: "27-04-2025 00:00", duration: 3, parent: "4", progress: 0.5, owner: [{ resource_id: "8", value: 5 }], priority: 2 },
		{ id: 11, text: "Product launch", type: "project", progress: 0.6, start_date: "02-04-2025 00:00", duration: 13, owner: [{ resource_id: "5", value: 4 }], parent: 0 },
		{ id: 12, text: "Perform Initial testing", type: "task", start_date: "03-04-2025 00:00", duration: 5, parent: "11", progress: 1, owner: [{ resource_id: "7", value: 6 }] },
		{ id: 13, text: "Development", type: "project", start_date: "03-04-2025 00:00", duration: 11, parent: "11", progress: 0.5, owner: [{ resource_id: "5", value: 2 }] },
		{ id: 14, text: "Analysis", type: "task", start_date: "03-04-2025 00:00", duration: 6, parent: "11", owner: [], progress: 0.8 },
		{ id: 15, text: "Design", type: "project", start_date: "03-04-2025 00:00", duration: 5, parent: "11", progress: 0.2, owner: [{ resource_id: "5", value: 5 }] },
		{ id: 16, text: "Documentation creation", type: "task", start_date: "03-04-2025 00:00", duration: 7, parent: "11", progress: 0, owner: [{ resource_id: "7", value: 2 }], priority: 1 },
		{ id: 17, text: "Develop System", type: "task", start_date: "03-04-2025 00:00", duration: 2, parent: "13", progress: 1, owner: [{ resource_id: "8", value: 1 }], priority: 2 },
		{ id: 25, text: "Beta Release", type: "milestone", start_date: "06-04-2025 00:00", parent: "13", progress: 0, owner: [{ resource_id: "5", value: 1 }], duration: 0 },
		{ id: 18, text: "Integrate System", type: "task", start_date: "10-04-2025 00:00", duration: 2, parent: "13", progress: 0.8, owner: [{ resource_id: "6", value: 2 }], priority: 3 },
		{ id: 19, text: "Test", type: "task", start_date: "13-04-2025 00:00", duration: 4, parent: "13", progress: 0.2, owner: [{ resource_id: "6", value: 3 }] },
		{ id: 20, text: "Marketing", type: "task", start_date: "13-04-2025 00:00", duration: 4, parent: "13", progress: 0, owner: [{ resource_id: "8", value: 4 }], priority: 1 },
		{ id: 21, text: "Design database", type: "task", start_date: "03-04-2025 00:00", duration: 4, parent: "15", progress: 0.5, owner: [{ resource_id: "6", value: 5 }] },
		{ id: 22, text: "Software design", type: "task", start_date: "03-04-2025 00:00", duration: 4, parent: "15", progress: 0.1, owner: [{ resource_id: "8", value: 3 }], priority: 1 },
		{ id: 23, text: "Interface setup", type: "task", start_date: "03-04-2025 00:00", duration: 5, parent: "15", progress: 0, owner: [{ resource_id: "8", value: 5 }], priority: 1 },
		{ id: 24, text: "Release v1.0", type: "milestone", start_date: "20-04-2025 00:00", parent: "11", progress: 0, owner: [{ resource_id: "5", value: 3 }], duration: 0 }
	],
	links: [
		{ id: "2", source: "2", target: "3", type: "0" },
		{ id: "3", source: "3", target: "4", type: "0" },
		{ id: "7", source: "8", target: "9", type: "0" },
		{ id: "8", source: "9", target: "10", type: "0" },
		{ id: "16", source: "17", target: "25", type: "0" },
		{ id: "17", source: "18", target: "19", type: "0" },
		{ id: "18", source: "19", target: "20", type: "0" },
		{ id: "22", source: "13", target: "24", type: "0" },
		{ id: "23", source: "25", target: "18", type: "0" }
	],
	// load resource values
	resources: [
		{ id: 1, text: "QA", parent: null },
		{ id: 2, text: "Development", parent: null },
		{ id: 3, text: "Sales", parent: null },
		{ id: 4, text: "Other", parent: null },
		{ id: 5, text: "Unassigned", parent: 4 },
		{ id: 6, text: "John", parent: 1, unit: "hours/day" },
		{ id: 7, text: "Mike", parent: 2, unit: "hours/day" },
		{ id: 8, text: "Anna", parent: 2, unit: "hours/day" },
		{ id: 9, text: "Bill", parent: 3, unit: "hours/day" },
		{ id: 10, text: "Floe", parent: 3, unit: "hours/day" }
	]
};