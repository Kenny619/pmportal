import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@radix-ui/react-separator";
import { ChartBarBig, FunnelPlus, FunnelX, NotebookPen } from "lucide-react";
export default function EventsFilter() {
	return (
		<div className="w-full m-0 p-0 ">
			{/*	
			<Tabs defaultValue="Projects" className="">
				<TabsList className="w-full m-0 pb-1 border-0 rounded-xs shadow-none">
					<TabsTrigger value="Projects" className="rounded-xs">
						<span className="text-xxs px-2">Projects</span>
					</TabsTrigger>
					<TabsTrigger value="Functions" className="rounded-xs">
						<span className="text-xxs px-2">Functions</span>
					</TabsTrigger>
					<TabsTrigger value="Owners" className="rounded-xs">
						<span className="text-xxs px-2">Owners</span>
					</TabsTrigger>
					<TabsTrigger value="Stages" className="rounded-xs">
						<span className="text-xxs px-2">Stages</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="Projects" className="w-full mt-0 bg-white">
					Make changes to your account here.
				</TabsContent>
				<TabsContent value="Functions" className="w-full mt-0 bg-white">
					Make changes to your account here.
				</TabsContent>
				<TabsContent value="Owners" className="w-full mt-0 bg-white">
					Make changes to your account here.
				</TabsContent>
				<TabsContent value="Stages" className="w-full mt-0 bg-white text-xs">
					<div className="flex flex-col gap-1">
						<div className="flex my-2">
							<Checkbox id="g0" />{" "}
							<label htmlFor="g0" className="ml-2">
								G0 - Initiation
							</label>
						</div>
						<div className="flex my-2">
							<Checkbox id="g3" />{" "}
							<label htmlFor="g3" className="ml-2">
								G3 - Design
							</label>
						</div>
						<div className="flex my-2">
							<Checkbox id="g5" />{" "}
							<label htmlFor="g5" className="ml-2">
								G5 - Development
							</label>
						</div>
						<div className="flex my-2">
							<Checkbox id="g7" />{" "}
							<label htmlFor="g7" className="ml-2">
								G7 - Closure
							</label>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="password">Change your password here.</TabsContent>
			</Tabs>
			*/}
			<div className="my-6">
				<div className="flex gap-3 my-2 border-b pb-2 border-neutral-300">
					<div className="grow flex gap-1 items-center">
						<ChartBarBig size={14} strokeWidth={2} className="" />
						<h2 className="text-xxs">Stage</h2>
					</div>
					<div className="flex gap-1 items-center">
						<FunnelPlus size={12} strokeWidth={1.5} className="" />
						<span className="text-xxs">Select All</span>
					</div>
					<div className="flex gap-1 items-center">
						<FunnelX size={12} strokeWidth={1.5} className="" />
						<span className="text-xxs">Clear All </span>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-xs ">
					<div className="flex">
						<Checkbox id="g0" />
						<label htmlFor="g0" className="ml-2">
							G0 - Initiation
						</label>
					</div>
					<div className="flex ">
						<Checkbox id="g3" />
						<label htmlFor="g3" className="ml-2">
							G3 - Design
						</label>
					</div>
					<div className="flex">
						<Checkbox id="g5" />
						<label htmlFor="g5" className="ml-2">
							G5 - Development
						</label>
					</div>
					<div className="flex">
						<Checkbox id="g7" />
						<label htmlFor="g7" className="ml-2">
							G7 - Closure
						</label>
					</div>
				</div>
			</div>

			<div className="my-6">
				<div className="flex gap-3 my-2 pb-1 border-b border-neutral-300">
					<div className="grow flex gap-1 items-center">
						<NotebookPen size={14} strokeWidth={2} className="" />
						<h2 className="text-xxs">Project</h2>
					</div>
					<div className="flex gap-1 items-center">
						<FunnelPlus size={12} strokeWidth={1.5} className="" />
						<span className="text-xxs">Select All</span>
					</div>
					<div className="flex gap-1 items-center">
						<FunnelX size={12} strokeWidth={1.5} className="" />
						<span className="text-xxs">Clear All </span>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-xs ">
					<div className="flex">
						<Checkbox id="g0" />
						<label htmlFor="g0" className="ml-2">
							G0 - Initiation
						</label>
					</div>
					<div className="flex ">
						<Checkbox id="g3" />
						<label htmlFor="g3" className="ml-2">
							G3 - Design
						</label>
					</div>
					<div className="flex">
						<Checkbox id="g5" />
						<label htmlFor="g5" className="ml-2">
							G5 - Development
						</label>
					</div>
					<div className="flex">
						<Checkbox id="g7" />
						<label htmlFor="g7" className="ml-2">
							G7 - Closure
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
