import { LoaderCircle } from "lucide-react";

export function LoadingSpinner() {
	return (
		<div className="flex items-center justify-center w-full h-full min-h-[300px]">
			<LoaderCircle className="animate-spin text-gray-500 w-12 h-12" />
		</div>
	);
}
