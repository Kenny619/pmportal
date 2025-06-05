import { Button } from "@/components/ui/button";
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

import {Input} from "@/components/ui/input";
export default function Settings() {
	const breadcrumb = [{ label: "Settings", link: "/settings" }];

	//check pro

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
								Please paste the full directory path where all the excel files are located
								<br/> e.g. C:\Users\konishi3\OneDrive - Philip Morris International\projects\
							</CardDescription>
							<div className="flex items-center gap-2 mt-4">
								<Input placeholder="excel files directory path" />
								<Button type="submit" variant="outline">
									Verify
								</Button>
								 								
								<span
									id="selectedPath"
									className="text-sm text-muted-foreground break-all"
								>
								</span>
							</div>
							<CardAction>status badge</CardAction>
						</CardHeader>
						<CardContent>
							<p>* placeholder - verification result</p>
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
