import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SerializedTask, Task, Link, GanttConfig } from "@dhx/trial-react-gantt";

interface GanttState {
	tasks: SerializedTask[];
	links: Link[];
	config: any;
}

const initialState: GanttState = {
	tasks: [
		{ id: 1, text: "Office itinerancy", type: "project", start_date:(new Date(2025, 3, 2)).toISOString(), duration: 17, progress: 0.4, parent: 0, open: true },
		{ id: 2, text: "Office facing", type: "project", start_date: (new Date(2025, 3, 2)).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true },
		{ id: 3, text: "Furniture installation", type: "project", start_date: (new Date(2025, 3, 11)).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true },
		{ id: 4, text: "The employee relocation", type: "project", start_date: (new Date(2025, 3, 13)).toISOString(), duration: 5, progress: 0.5, parent: 1, priority: 3, open: true },
		{ id: 5, text: "Interior office", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 1 },
		{ id: 6, text: "Air conditioners check", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 2 },
		{ id: 7, text: "Workplaces preparation", type: "task", start_date: (new Date(2025, 3, 12)).toISOString(), duration: 8, progress: 0.6, parent: 3 },
		{ id: 8, text: "Preparing workplaces", type: "task", start_date: (new Date(2025, 3, 14)).toISOString(), duration: 5, progress: 0.5, parent: 4, priority: 1 },
		{ id: 9, text: "Workplaces importation", type: "task", start_date: (new Date(2025, 3, 21)).toISOString(), duration: 4, progress: 0.5, parent: 4 },
		{ id: 10, text: "Workplaces exportation", type: "task", start_date: (new Date(2025, 3, 27)).toISOString(), duration: 3, progress: 0.5, parent: 4, priority: 2 },
		{ id: 11, text: "Product launch", type: "project", start_date: (new Date(2025, 3, 2)).toISOString(), duration: 13, progress: 0.6, parent: 0, open: true },
		{ id: 12, text: "Perform Initial testing", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 5, progress: 1, parent: 11 },
		{ id: 13, text: "Development", type: "project", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 11, progress: 0.5, parent: 11, open: true },
		{ id: 14, text: "Analysis", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 6, progress: 0.8, parent: 11 },
		{ id: 15, text: "Design", type: "project", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 5, progress: 0.2, parent: 11, open: true },
		{ id: 16, text: "Documentation creation", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 7, progress: 0, parent: 11, priority: 1 },
		{ id: 17, text: "Develop System", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 2, progress: 1, parent: 13, priority: 2 },
		{ id: 25, text: "Beta Release", type: "milestone", start_date: (new Date(2025, 3, 6)).toISOString(), duration: 0, progress: 0, parent: 13 },
		{ id: 18, text: "Integrate System", type: "task", start_date: (new Date(2025, 3, 10)).toISOString(), duration: 2, progress: 0.8, parent: 13, priority: 3 },
		{ id: 19, text: "Test", type: "task", start_date: (new Date(2025, 3, 13)).toISOString(), duration: 4, progress: 0.2, parent: 13 },
		{ id: 20, text: "Marketing", type: "task", start_date: (new Date(2025, 3, 13)).toISOString(), duration: 4, progress: 0, parent: 13, priority: 1 },
		{ id: 21, text: "Design database", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 4, progress: 0.5, parent: 15 },
		{ id: 22, text: "Software design", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 4, progress: 0.1, parent: 15, priority: 1 },
		{ id: 23, text: "Interface setup", type: "task", start_date: (new Date(2025, 3, 3)).toISOString(), duration: 5, progress: 0, parent: 15, priority: 1 },
		{ id: 24, text: "Release v1.0", type: "milestone", start_date: (new Date(2025, 3, 18)).toISOString(), duration: 0, progress: 0, parent: 11 }
	],
	links: [
		{ id: 2, source: 2, target: 3, type: "0" },
		{ id: 3, source: 3, target: 4, type: "0" },
		{ id: 7, source: 8, target: 9, type: "0" },
		{ id: 8, source: 9, target: 10, type: "0" },
		{ id: 16, source: 17, target: 25, type: "0" },
		{ id: 17, source: 18, target: 19, type: "0" },
		{ id: 18, source: 19, target: 20, type: "0" },
		{ id: 22, source: 13, target: 24, type: "0" },
		{ id: 23, source: 25, target: 18, type: "0" }
	],
	config: {
		zoom: {
			current: 'day',
			levels: [
				{
					name: "day",
					scale_height: 27,
					min_column_width: 80,
					scales: [
						{ unit: "day", step: 1, format: "%d %M" }
					]
				},
				{
					name: "month",
					scale_height: 50,
					min_column_width: 120,
					scales: [
						{ unit: "month", format: "%F, %Y" },
						{ unit: "week", format: "Week #%W" }
					]
				},
				{
					name: "year",
					scale_height: 50,
					min_column_width: 30,
					scales: [
						{ unit: "year", step: 1, format: "%Y" }
					]
				}
			]
		}
	},
};

const ganttSlice = createSlice({
	name: 'gantt',
	initialState,
	reducers: {

		updateTask(state, action: PayloadAction<Task>) {
			const updatedTask = action.payload;
			const index = state.tasks.findIndex(task => task.id === updatedTask.id);
			if (index !== -1) {
				state.tasks[index] = { ...state.tasks[index], ...updatedTask };
			}
		},
		createTask(state, action: PayloadAction<Task>) {
			state.tasks.push(action.payload);
		},
		deleteTask(state, action: PayloadAction<string>) {
			state.tasks = state.tasks.filter(task => String(task.id) !== action.payload);
		},
		updateLink(state, action: PayloadAction<Link>) {
			const updatedLink = action.payload;
			const index = state.links.findIndex(link => link.id === updatedLink.id);
			if (index !== -1) {
				state.links[index] = { ...state.links[index], ...updatedLink };
			}
		},
		createLink(state, action: PayloadAction<Link>) {
			state.links.push(action.payload);
		},
		deleteLink(state, action: PayloadAction<string>) {
			state.links = state.links.filter(link => String(link.id) !== action.payload);
		},
		updateConfig(state, action: PayloadAction<Partial<any>>) {
			state.config = { ...state.config, ...action.payload };
		},
	},
});

export const {
	updateTask,
	createTask,
	deleteTask,
	updateLink,
	createLink,
	deleteLink,
	updateConfig,
} = ganttSlice.actions;
export default ganttSlice.reducer;
