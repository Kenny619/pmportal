import Layout from "../layout";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Settings() {
	const breadcrumb = [{ label: "Settings", link: "/settings" }];

	return (
		<Layout breadcrumb={breadcrumb}>
			<div className="w-full h-full">
				<h1 className="text-3xl font-bold my-8">Settings</h1>
			</div>
			<div className="flex flex-wrap md:flex-nowrap w-full">
				{/* 5 events container  */}
				<div className="w-full ">
					<Card className="w-full rounded-xs">
						<CardHeader>
							<CardTitle>Excel file directory </CardTitle>
							<CardDescription>
								Please select the directory where the excel files are located.
							</CardDescription>
							<div className="flex items-center gap-2 mt-4">
								<input
									type="file"
									webkitdirectory="true"
									directory="true"
									className="hidden"
									multiple={false}
									id="directoryInput"
									onChange={(e) => {
										const files = e.target.files;
										if (files && files.length > 0) {
											// Get the directory path from the first file
											const path = files[0].webkitRelativePath.split("/")[0];
											// Get current working directory path
											const currentPath = window.location.origin;
											const directoryPath = `${currentPath}/${path}`;
											// Update displayed path
											const displayElement =
												document.getElementById("selectedPath");
											if (displayElement) {
												displayElement.textContent = directoryPath;
											}
										}
									}}
								/>
								<button
									onClick={() =>
										document.getElementById("directoryInput")?.click()
									}
									className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
									type="button"
								>
									Select Directory
								</button>
								<span
									id="selectedPath"
									className="text-sm text-muted-foreground break-all"
								>
									No directory selected
								</span>
							</div>
							<CardAction>Card Action</CardAction>
						</CardHeader>
						<CardContent>
							<p>Card Content</p>
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</Layout>
	);
}
