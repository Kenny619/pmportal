import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

interface BreadCrumbProps {
	breadcrumb:
		| {
				label: string;
				link: string;
		  }[]
		| [];
}

export default function BreadCrumb({ breadcrumb }: BreadCrumbProps) {
	return (
		<header className="w-full mb-1 ">
			<Breadcrumb>
				<BreadcrumbList className="text-xxs">
					<BreadcrumbItem>
						<Link to="/">Home</Link>
					</BreadcrumbItem>
					{breadcrumb.length > 0 && <BreadcrumbSeparator />}
					{breadcrumb?.map(
						(item: { label: string; link: string }, index: number) => (
							<div key={item.label}>
								<BreadcrumbItem key={item.label}>
									<Link to={item.link}>{item.label}</Link>
								</BreadcrumbItem>
								{index !== breadcrumb.length - 1 && (
									<BreadcrumbSeparator key={item.label} />
								)}
							</div>
						),
					)}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
}
