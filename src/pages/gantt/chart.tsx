import  { useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';
import { wbsStore, type WbsState } from '@/stores/wbsStore';
import type { Timeline, Project } from '@/types/type';
import {excelSerialToJST} from '@/lib/utils';
import '@/styles/gantt-custom-styles.css';
import holidays from "date-holidays";
type GanttTask = {
  id: string;
  parent?: string;
  open?: boolean;
  type?: string;
  tree?: boolean;
  duration?: number;
  status?: string;
  workflow?: string;
  category?: string;
  text: string;
  start_date?: string;
  end_date?: string;
  function?: string;
  owner?: string;
  notes?: string;
  dateStatus?: string;
}

type SortTask = {
  milestone: GanttTask[];
  initiation: GanttTask[];
  design: GanttTask[];
  development: GanttTask[];
  closure: GanttTask[];
}



const GanttChart = () => {
  const projects = wbsStore((state: WbsState) => state.projects);
  const tasks = createTasks(projects[0]);

  function createTasks(project: Project) {
    console.log(project.Tasks);
    let tasks: SortTask =
    {
      milestone: [
        {id: "M", text: "Milestone", type: "project", open: true}
      ],
      initiation: [

        {id: "G0", text: "G0 Initiation", type: "project", open: true}
     ],
      design: [
        {id: "G3", text: "G3 Design", type: "project", open: true}
     ],
     development: [
      {id: "G5", text: "G5 Development", type: "project", open: true}
     ],
     closure: [
      {id: "G7", text: "G7 Closure", type: "project", open: true}
     ],
    }
    project.Tasks.filter((task: Timeline) => task.Category === "PGCM" || task.Category === "Launch").forEach((task: Timeline) => {
      tasks.milestone.push({
        id: tasks.milestone.length.toString().padStart(4, '0'),
        parent: "M",
        status: task.Status,
        category: task.Category,
        text: `${task.Stage} ${task.TaskName}`,
        start_date: task.StartDate ? excelSerialToJST(task.StartDate).toISOString().split('T')[0] : "",
        duration: 1,
        function: task.Function,
        owner: task.OwnerName,
        notes: task.Notes,
        dateStatus: task.DateStatus,
        type: "milestone"
      })
    })

    const stages = [
      {G: "G0", name: "initiation"},
      {G: "G3", name: "design"},
      {G: "G5", name: "development"},
      {G: "G7", name: "closure"}
    ]

    stages.forEach((stage: {G: string, name: string}) => {
      project.Tasks.filter((task: Timeline) => task.Stage === stage.G).forEach((task: Timeline) => {
        tasks[stage.name as keyof SortTask].push({
          id: (Number(stage.G.match(/\d/)?.[0]) * 1000 + tasks[stage.name as keyof SortTask].length).toString(),
        parent: stage.G,
        tree: true,
        status: task.Status,
        category: task.Category,
        text: task.TaskName,
        function: task.Function,
        owner: task.OwnerName,
        notes: task.Notes,
        dateStatus: task.DateStatus,
        type: "task"
        })
        if (task.StartDate) {
          tasks[stage.name as keyof SortTask][tasks[stage.name as keyof SortTask].length - 1].start_date = excelSerialToJST(task.StartDate).toISOString().split('T')[0];
        }
        if (task.DueDate) {
          tasks[stage.name as keyof SortTask][tasks[stage.name as keyof SortTask].length - 1].end_date = excelSerialToJST(task.DueDate).toISOString().split('T')[0];
        }
      })
    })

    console.log(excelSerialToJST(45828).toISOString().split('T')[0]);

    return {
      data: Object.values(tasks).flat(),
      links: []
    }
  }




// Gantt config
const dateFormatter = (gantt as any).date.date_to_str("%M-%d %Y");
(gantt as any).config.grid_width = window.innerWidth * 0.4; // 40% of screen width

// Configure scale to show days of week
(gantt as any).config.scales = [
  {unit: "month", step: 1, format: "%Y %M"},
  {
    unit: "day",
    step: 1,
    format: function(date: Date) {
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      return date.getDate() + " " + days[date.getDay()];
    }
  }
];
  //day width
  (gantt as any).config.scale_width = 22;
  //background color for weekend and holiday
const hd = new holidays("JP");
(gantt as any).templates.scale_cell_class = function (date: Date) {
  if (date.getDay() === 0 || date.getDay() === 6 || hd.isHoliday(date)) {
    return "weekend"; // Same style as weekends
  }
  return "";
};

(gantt as any).templates.timeline_cell_class = function (task: GanttTask, date: Date) {
  if (date.getDay() === 0 || date.getDay() === 6 || hd.isHoliday(date)) {
    return "weekend";
  }
  return "";
};

(gantt as any).config.columns = [
  { name: "id", label: "ID", align: "center", width: 40},
  { name: "status", label: "Status", align: "center", width: 45},
  { name: "category", label: "Category", align: "left", width: 80 },
  { name: "text", label: "Task name", tree: true, width: "*" },
  { name: "owner", label: "Owner", align: "left", width: 60 },
  // { 
  //   name: "start_date", label: "Start", align: "center", 
  //   template: function(task: GanttTask) {
  //     if(task.start_date) {
  //       return dateFormatter(task.start_date);
  //     }
  //     return "-";
  //   }
  // },
  { 
    name: "end_date", label: "Due", align: "center", width: 80,
    template: function(task: GanttTask) {
      if(task.end_date) {
        return dateFormatter(task.end_date);
      }
      return "-";
    }
  },
  { name: "dateStatus", label: "Date Status", align: "center", width: 20 },
];


  const ganttContainer = useRef(null);
  useEffect(() => {
    (gantt as any).init(ganttContainer.current);
    (gantt as any).parse(tasks); // Data format: { data: [], links: [] }
    return () => {
      (gantt as any).clearAll();
    };
  }, [tasks]);

  return (
    <div
      ref={ganttContainer}
      className="w-full h-[calc(100vh-200px)]"
    ></div>
  );
};

export default GanttChart;
