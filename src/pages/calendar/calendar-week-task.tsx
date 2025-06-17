import { SquareFunction, CircleUserRound, CalendarCheck } from 'lucide-react';
import type { TaskByDate } from '@/types/type';
export default function CalenderWeekTask(task: TaskByDate) {
	const statusColor = (status: string | undefined) => {
		if (!status) return '';
		const upperStatus = status.toUpperCase();
		if (upperStatus === 'OPEN') return 'bg-amber-700';
		if (upperStatus === 'DONE') return 'bg-green-700';
		if (upperStatus === 'CANCELLED') return 'bg-red-700';
		if (upperStatus === 'WIP') return 'bg-blue-700';
		if (upperStatus === 'N/A') return 'bg-gray-700';
		return 'bg-gray-700';
	};

	const dateSTColor = (dateST: string | undefined) => {
		if (!dateST) return 'text-gray-700';
		if (dateST.toUpperCase() === 'CONFIRMED') return 'text-green-700';
		if (dateST.toUpperCase() === 'TENTATIVE') return 'text-red-500';
		return 'text-red-700';
	};

	return (
		<div className={'w-full bg-neutral-50 p-2 rounded-xs my-2 border-l-4 shadow-sm'} style={{ borderColor: task.Color }}>
			<div className="flex items-center p-0">
				<a href={`https://pmjpn.service-now.com/sp_pbos?id=search&q=${task.TaskId}`} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:text-blue-700 ">
					<div className={'text-xxxxs rounded-xs  my-0 px-1 py-0.5 mr-1 font-normal text-white '} style={{ backgroundColor: task.Color }}>
						{task.ProjectId}
					</div>
				</a>
				<div className="text-xxxxs rounded-xs py-0.5 px-1 mr-1 border">{task.Stage}</div>
				<div className={`text-xxxxs rounded-xs py-0.5 w-auto px-4 ml-auto ${statusColor(task.Status)} text-white`}>{task.Status}</div>
			</div>
			<div className="text-xxxs  leading-[1.2] my-1 text-gray-600">
				<a href={`https://pmjpn.service-now.com/sp_pbos?id=search&q=${task.TaskId}`} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:text-blue-700">
					{task.ProjectName}
				</a>
			</div>

			<div className="w-full py-1 text-xs leading-[1.2] my-1 text-gray-700">{task.TaskName}</div>
			{task.Notes ? <div className="w-full mt-1 mb-2 text-xxxs text-gray-600">{task.Notes}</div> : ''}
			<div className="w-full mt-1 text-xxxs flex flex-col lg:flex-row flex-nowrap  gap-1">
				<div className="flex justify-start">
					<div className="flex items-center ">
						<SquareFunction size={11} strokeWidth={1} />
						<div className="text-xxxs ml-1 mr-1 w-min-[100px] ">{task.Function ? task.Function : '-'}</div>
					</div>
					<div className="flex items-center ">
						<CircleUserRound size={11} strokeWidth={1} />
						<span className="text-xxxs ml-1 mr-1 w-min[100px]">{task.OwnerName ? task.OwnerName : '-'}</span>
					</div>
				</div>
				<div className="flex left-auto justify-end w-full items-center">
					<CalendarCheck size={11} strokeWidth={1} className={`${dateSTColor(task.DateStatus)}`} />
					<div className={`text-xxxs ${dateSTColor(task.DateStatus)} px-1`}>{task.DateStatus ? task.DateStatus : '-'}</div>
				</div>
			</div>
		</div>
	);
}
