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
export default function CalenderWeekTask(task: Task) {
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
				"w-full bg-neutral-50 p-2 rounded-xs my-2 border-l-4 shadow-sm"
			}
			style={{ borderColor: task.color }}
		>
			<div className="flex items-center p-0">
				<a
					href={`https://pmjpn.service-now.com/sp_pbos?id=search&q=${task.id}`}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:cursor-pointer hover:text-blue-700 "
				>
					<div
						className={"text-xxxxs rounded-xs  my-0 px-1 py-0.5 mr-1 font-normal text-white "}
						style={{ backgroundColor: task.color }}
					>
						{task.id}
					</div>
				</a>
				<div
					className="text-xxxxs rounded-xs py-0.5 px-1 mr-1 border"
				>
					{task.G}
				</div>
				<div
					className={`text-xxxxs rounded-xs py-0.5 w-auto px-4 ml-auto ${statusColor(task.Status)} text-white`}
				>
					{task.Status}
				</div>
			</div>
			<div className="text-xxxs  leading-[1.2] my-1 text-gray-600">
				<a
					href={`https://pmjpn.service-now.com/sp_pbos?id=search&q=${task.id}`}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:cursor-pointer hover:text-blue-700"
				>
					{task.pjtName}
				</a>
			</div>

			<div className="w-full py-1 text-xs leading-[1.2] my-1 text-gray-700">
				{task.Task}
			</div>
			{task.Notes ? (
				<div className="w-full mt-1 mb-2 text-xxxs text-gray-600">
					{task.Notes}
				</div>
			) : (
				""
			)}
			<div className="w-full mt-1 text-xxxs flex flex-col lg:flex-row flex-nowrap  gap-1">
				<div className="flex justify-start">
					<div className="flex items-center ">
						<SquareFunction size={11} strokeWidth={1} />
						<div className="text-xxxs ml-1 mr-1 w-min-[100px] ">
							{task.Fn ? task.Fn : "-"}
						</div>
					</div>
					<div className="flex items-center ">
						<CircleUserRound size={11} strokeWidth={1} />
						<span className="text-xxxs ml-1 mr-1 w-min[100px]">
							{task.Owner ? task.Owner : "-"}
						</span>
					</div>
				</div>
				<div className="flex left-auto justify-end w-full items-center">
					<CalendarCheck
						size={11}
						strokeWidth={1}
						className={`${dateSTColor(task.DateST)}`}
					/>
					<div className={`text-xxxs ${dateSTColor(task.DateST)} px-1`}>
						{task.DateST ? task.DateST : "-"}
					</div>
				</div>
			</div>
		</div>
	);
}
