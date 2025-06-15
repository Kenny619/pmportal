import Layout from "../layout";
import GanttChart from "@/pages/gantt/chart";
export default function Gantt() {
	const breadcrumb = [{ label: "Gantt", link: "/gantt" }];

	return (
		<Layout breadcrumb={breadcrumb}>
			<div className="w-full h-full">
				<h1 className="text-3xl font-bold my-8">Gantt Chart</h1>
			</div>
			<div className="flex flex-wrap md:flex-nowrap w-full">
				{/* 5 events container  */}
				<div className="w-full ">
					{/* date navigation area */}
					<GanttChart />
				</div>
			</div>
		</Layout>
	);
}
