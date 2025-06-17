import { Badge } from '@/components/ui/badge';
import { SquareFunction, CircleUserRound, CalendarCheck } from 'lucide-react';
import { type TaskByDate } from '@/types/type';

export default function CalenderMonthTask(task: TaskByDate) {
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
		<div className={'w-full bg-neutral-50 p-1 rounded-xs my-1 border-l-2 shadow-sm text-xxxxs'} style={{ borderColor: task.Color }}>
			<div className="flex flex-wrap items-center">
				<div className="flex items-center">
					<a href={`https://pmjpn.service-now.com/sp_pbos?id=search&q=${task.ProjectId}`} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:text-blue-700 ">
						<Badge className={'text-xxxxs rounded-xs py-0 px-1 mr-1 font-normal'} style={{ backgroundColor: task.Color }}>
							{task.ProjectId}
						</Badge>
					</a>
					<div className={`text-xxxxs rounded-xs py-0 px-1 mr-1 font-normal ${statusColor(task.Status)} text-white`}>{task.Status}</div>
				</div>
				<div className="text-xxxs leading-[1.2] text-gray-700 break-words">
					<a href={`https://pmjpn.service-now.com/sp_pbos?id=search&q=${task.ProjectId}`} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:text-blue-700 ">
						{task.ProjectName}
					</a>
				</div>
			</div>

			<div className="text-xxs w-full py-1 text-sm leading-[1.2] text-black">{task.TaskName}</div>
			<div className="w-full mt-1 text-xxxs flex flex-col lg:flex-wrap  gap-1">
				<div className="flex justify-start">
					<div className="flex items-center ">
						<SquareFunction size={13} strokeWidth={1} />
						<div className="ml-1 mr-1 w-min-[33%] ">{task.Function ? task.Function : '-'}</div>
					</div>
					<div className="flex items-center ">
						<CircleUserRound size={13} strokeWidth={1} />
						<span className="ml-1 mr-1">{task.OwnerName ? task.OwnerName : '-'}</span>
					</div>
				</div>
				<div className="flex items-center">
					<CalendarCheck size={13} strokeWidth={1} className={`${dateSTColor(task.DateStatus)}`} />
					<div className={`${dateSTColor(task.DateStatus)} px-1`}>{task.DateStatus ? task.DateStatus : '-'}</div>
				</div>
			</div>
		</div>
	);
}
