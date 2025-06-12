import React, { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';
import 'frappe-gantt/dist/frappe-gantt.css';

export interface Task {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  owner?: string;
  priority?: string;
}

interface GanttChartProps {
  tasks: Task[];
  viewMode: 'Day' | 'Week' | 'Month' | 'Year';
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, viewMode }) => {
  const ganttRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ganttRef.current) {
      ganttRef.current.innerHTML = '';

      new Gantt(ganttRef.current, tasks, {
        view_mode: viewMode,
        date_format: 'YYYY-MM-DD',
        custom_popup_html: task => `
          <div class="details-container">
            <h5>${task.name}</h5>
            <p>Owner: ${task.Owner ?? 'N/A'}</p>
          </div>
        `
      });
    }
  }, [tasks, viewMode]);

  return <div ref={ganttRef} />;
};

export default GanttChart;
