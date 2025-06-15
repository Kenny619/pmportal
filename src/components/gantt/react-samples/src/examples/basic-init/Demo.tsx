import React, { useEffect, useRef, useState } from 'react';
import ReactGantt, {Task, Link, GanttConfig, ReactGanttRef, GanttTemplates, useWorkTime, Calendar, Marker} from "@dhx/trial-react-gantt";
import "@dhx/trial-react-gantt/dist/react-gantt.css";
import "./styles.css"


export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);
  useEffect(() => {
    document.title = "DHTMLX React Gantt | Basic Init";
  }, []);


  const { isWorkTime }= useWorkTime(ganttRef);
  const initialData: { tasks: Task[], links: Link[]} = {
    tasks:  [
      { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
      { id: 2, text: "Office facing", type: "project", start_date: new Date(2025, 3, 2), duration: 8, progress: 0.6, parent: 1, open: true },
      { id: 3, text: "Furniture installation", type: "project", start_date: new Date(2025, 3, 11), duration: 8, progress: 0.6, parent: 1, open: true },
      { id: 4, text: "The employee relocation", type: "project", start_date: new Date(2025, 3, 13), duration: 5, progress: 0.5, parent: 1, priority: 3, open: true },
      { id: 5, text: "Interior office", type: "task", start_date: new Date(2025, 3, 3), duration: 7, progress: 0.6, parent: 2, priority: 1 },
      { id: 6, text: "Air conditioners check", type: "task", start_date: new Date(2025, 3, 3), duration: 7, progress: 0.6, parent: 2, priority: 2 },
      { id: 7, text: "Workplaces preparation", type: "task", start_date: new Date(2025, 3, 12), duration: 8, progress: 0.6, parent: 3 },
      { id: 8, text: "Preparing workplaces", type: "task", start_date: new Date(2025, 3, 14), duration: 5, progress: 0.5, parent: 4, priority: 1 },
      { id: 9, text: "Workplaces importation", type: "task", start_date: new Date(2025, 3, 21), duration: 4, progress: 0.5, parent: 4 },
      { id: 10, text: "Workplaces exportation", type: "task", start_date: new Date(2025, 3, 27), duration: 3, progress: 0.5, parent: 4, priority: 2 },
      { id: 11, text: "Product launch", type: "project", start_date: new Date(2025, 3, 2), duration: 13, progress: 0.6, parent: 0, open: true },
      { id: 12, text: "Perform Initial testing", type: "task", start_date: new Date(2025, 3, 3), duration: 5, progress: 1, parent: 11 },
      { id: 13, text: "Development", type: "project", start_date: new Date(2025, 3, 3), duration: 11, progress: 0.5, parent: 11, open: true },
      { id: 14, text: "Analysis", type: "task", start_date: new Date(2025, 3, 3), duration: 6, progress: 0.8, parent: 11 },
      { id: 15, text: "Design", type: "project", start_date: new Date(2025, 3, 3), duration: 5, progress: 0.2, parent: 11, open: true },
      { id: 16, text: "Documentation creation", type: "task", start_date: new Date(2025, 3, 3), duration: 7, progress: 0, parent: 11, priority: 1 },
      { id: 17, text: "Develop System", type: "task", start_date: new Date(2025, 3, 3), duration: 2, progress: 1, parent: 13, priority: 2 },
      { id: 25, text: "Beta Release", type: "milestone", start_date: new Date(2025, 3, 6), duration: 0, progress: 0, parent: 13 },
      { id: 18, text: "Integrate System", type: "task", start_date: new Date(2025, 3, 10), duration: 2, progress: 0.8, parent: 13, priority: 3 },
      { id: 19, text: "Test", type: "task", start_date: new Date(2025, 3, 13), duration: 4, progress: 0.2, parent: 13 },
      { id: 20, text: "Marketing", type: "task", start_date: new Date(2025, 3, 13), duration: 4, progress: 0, parent: 13, priority: 1 },
      { id: 21, text: "Design database", type: "task", start_date: new Date(2025, 3, 3), duration: 4, progress: 0.5, parent: 15 },
      { id: 22, text: "Software design", type: "task", start_date: new Date(2025, 3, 3), duration: 4, progress: 0.1, parent: 15, priority: 1 },
      { id: 23, text: "Interface setup", type: "task", start_date: new Date(2025, 3, 3), duration: 5, progress: 0, parent: 15, priority: 1 },
      { id: 24, text: "Release v1.0", type: "milestone", start_date: new Date(2025, 3, 18), duration: 0, progress: 0, parent: 11 }
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
    ]
  };

  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({date, task}) ? "" : "weekend";
    }
  };
  const config: GanttConfig = {
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%d %M", css: (date: Date) => {
        return isWorkTime({date}) ? "" : "weekend";
      } },
    ],
    row_height: 50,
    grid_width: 550,
    scale_height: 90,
    work_time: true
  };

  const calendars: Calendar[] = [
    {
      id: "global",
      hours: ["8:00-12:00", "13:00-17:00"],//global work hours for workdays
      days: {
        weekdays: {
          0: false, // 0 - Sunday, 6 - Saturday
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: false
        },
        dates: {
         "2025-04-06": true, // override work day/hours for specific dates
         "2025-04-08": false
        }
      }
   }
  ];


  const projectStartMarker = {
    id: "marker1",
    start_date: new Date(2025, 3, 3),
    text: "Project start!",
    css: "project-start"
  };
  const projectEndMarker = {
    id: "marker2",
    start_date: new Date(2025, 4, 1),
    text: "Project end",
    css: "project-end"
  };

  const [markers, setMarkers] = useState<Marker[]>([
    projectStartMarker,
    projectEndMarker
  ]);




  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        tasks={initialData.tasks}
        links={initialData.links}
        markers={markers}
        templates={templates}
        config={config}
        calendars={calendars}
        ref={ganttRef}
      />
    </div>
  );
};