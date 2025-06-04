import { Badge } from "@/components/ui/badge";
import { SquareFunction, CircleUserRound, CalendarCheck } from "lucide-react";

type Task = {
	color: string;
	id: string;
	pjtName: string;
	G: string;
	Task: string;
	Status?: string;
	Fn?: string;
	Owner?: string;
	Start?: number;
	Due?: number;
	Notes?: string;
	DateST?: string;
};
export default function CalenderMonthTask(task: Task) {
	const statusColor = (status: string | undefined) => {
		if (!status) return "";
		const upperStatus = status.toUpperCase();
		if (upperStatus === "OPEN") return "bg-amber-700";
		if (upperStatus === "DONE") return "bg-green-700";
		if (upperStatus === "CANCELLED") return "bg-red-700";
		if (upperStatus === "WIP") return "bg-blue-700";
		if (upperStatus === "N/A") return "bg-gray-700";
		return "bg-gray-700";
	};
	const dateSTColor = (dateST: string | undefined) => {
		if (!dateST) return "text-gray-700";
		if (dateST.toUpperCase() === "CONFIRMED") return "text-green-700";
		if (dateST.toUpperCase() === "TENTATIVE") return "text-red-500";
		return "text-red-700";
	};
	return (
		<div
			className={
				"w-full bg-neutral-50 p-1 rounded-xs my-1 border-l-2 shadow-sm text-xxxxs"
			}
			style={{ borderColor: task.color }}
		>
			<div className="flex flex-wrap items-center">
				<div className="flex items-center">
					<a
						href={`https://pmjpn.service-now.com/sp_pbos?id=search&q=${task.id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:cursor-pointer hover:text-blue-700 "
					>
						<Badge
							className={"text-xxxxs rounded-xs py-0 px-1 mr-1 font-normal"}
							style={{ backgroundColor: task.color }}
						>
							{task.id}
						</Badge>
					</a>
					<div
						className={`text-xxxxs rounded-xs py-0 px-1 mr-1 font-normal ${statusColor(task.Status)} text-white`}
					>
						{task.Status}
					</div>
				</div>
				<div className="text-xxxs leading-[1.2] text-gray-700 break-words">
					<a
						href={`https://pmjpn.service-now.com/sp_pbos?id=search&q=${task.id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:cursor-pointer hover:text-blue-700 "
					>
						{task.pjtName}
					</a>
				</div>
			</div>

			<div className="text-xxs w-full py-1 text-sm leading-[1.2] text-black">
				{task.Task}
			</div>
			<div className="w-full mt-1 text-xxxs flex flex-col lg:flex-wrap  gap-1">
				<div className="flex justify-start">
					<div className="flex items-center ">
						<SquareFunction size={13} strokeWidth={1} />
						<div className="ml-1 mr-1 w-min-[33%] ">
							{task.Fn ? task.Fn : "-"}
						</div>
					</div>
					<div className="flex items-center ">
						<CircleUserRound size={13} strokeWidth={1} />
						<span className="ml-1 mr-1">
							{task.Owner ? task.Owner : "-"}
						</span>
					</div>
				</div>
				<div className="flex items-center">
					<CalendarCheck
						size={13}
						strokeWidth={1}
						className={`${dateSTColor(task.DateST)}`}
					/>
					<div className={`${dateSTColor(task.DateST)} px-1`}>
						{task.DateST ? task.DateST : "-"}
					</div>
				</div>
			</div>
		</div>
	);
}
