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
import Today from "./today";

export default function Home() {
	return (
		<Layout breadcrumb={[]}>
			<div className="w-full h-full">
				<h1 className="text-3xl font-bold my-8">Home</h1>
			</div>
			<div className="flex flex-wrap md:flex-nowrap w-full">
				{/* 5 events container  */}
				<div className="w-full flex flex-col gap-4">
					<Card className="w-full rounded-xs">
						<CardHeader>
							<CardTitle>Today </CardTitle>
							<CardDescription>
								Please select the directory where the excel files are located.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Today />
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
					{/* Progress  */}
					<Card className="w-full rounded-xs">
						<CardHeader>
							<CardTitle>Progress </CardTitle>
							<CardDescription>Last 5 days progress</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Card Content</p>
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
					{/* data integrity card */}
					<Card className="w-full rounded-xs">
						<CardHeader>
							<CardTitle>Data Integrity </CardTitle>
							<CardDescription>
								Please select the directory where the excel files are located.
							</CardDescription>
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
