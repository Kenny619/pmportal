import {
	ChartBarBig,
	CircleX,
	FunnelPlus,
	FunnelX,
	ChevronUp,
	ChevronDown,
	Funnel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { wbsStore, type Filter, type WbsState } from "@/stores/wbsStore";

export default function CalendarFilter() {
	const [isOpen, setIsOpen] = React.useState(false);
	const currentFilter = wbsStore((state: WbsState) => state.currentFilter);
	const defaultFilter = wbsStore((state: WbsState) => state.defaultFilter);
	const updateFilter = wbsStore((state: WbsState) => state.updateFilter);
	const selectGroupFilter = wbsStore(
		(state: WbsState) => state.selectGroupFilter,
	);
	const clearGroupFilter = wbsStore(
		(state: WbsState) => state.clearGroupFilter,
	);
	const selectAllFilter = wbsStore((state: WbsState) => state.selectAllFilter);
	const clearAllFilter = wbsStore((state: WbsState) => state.clearAllFilter);
	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-full space-y-2 bg-neutral-50"
		>
			<div className="flex items-center justify-between space-x-4 px-4">
				<CollapsibleTrigger asChild>
					<div className="flex items-center hover:cursor-pointer ">
						<div className="flex items-center hover:cursor-pointer ">
							<div className="flex items-center md:item-end lg:bg-white hover:bg-neutral-100 px-2 py-1 lg:rounded-xs lg:shadow-xs text-neutral-600 ">
								<Button variant="ghost" size="sm">
									<Funnel size={14} strokeWidth={1} className="mx-2" />
									<span className="text-xs ml-1">Filter</span>
								</Button>
							</div>
						</div>
					</div>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent className="space-y-2">
				<div className="w-full h-auto m-0 py-2 px-2 bg-gray-100 ">
					{Object.keys(defaultFilter).map((key) => (
						<div className="my-6" key={key}>
							<div className="flex gap-3 my-2 border-b pb-2 border-neutral-300">
								<div className="grow flex gap-1 items-center">
									<ChartBarBig size={14} strokeWidth={2} className="" />
									<h2 className="text-xxs">{key}</h2>
								</div>
								<Button
									variant="ghost"
									className="flex gap-1 items-center m-0"
									onClick={() => selectGroupFilter(key as keyof Filter)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											selectGroupFilter(key as keyof Filter);
										}
									}}
								>
									<FunnelPlus size={12} strokeWidth={1.5} className="" />
									<span className="text-xxs">Select All</span>
								</Button>
								<Button
									variant="ghost"
									className="flex gap-1 items-center m-0"
									onClick={() => clearGroupFilter(key as keyof Filter)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											clearGroupFilter(key as keyof Filter);
										}
									}}
								>
									<FunnelX size={12} strokeWidth={1.5} className="" />
									<span className="text-xxs">Clear All </span>
								</Button>
							</div>
							<div className="flex flex-col gap-2 text-xs ">
								{defaultFilter[key as keyof Filter].map((item) => (
									<div className="flex" key={`${item}`}>
										<Button
											variant="ghost"
											id={item}
											onClick={() => {
												updateFilter(key as keyof Filter, item);
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													updateFilter(key as keyof Filter, item);
												}
											}}
										>
											<label
												htmlFor={item}
												className="ml-2 flex gap-1 items-center"
											>
												<CircleX size={12} strokeWidth={1} className="" />
												<span className="text-xxs">{item}</span>
											</label>
										</Button>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
