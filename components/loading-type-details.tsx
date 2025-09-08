// For loading fallback in type details tooltip of pokemon cards

import { Skeleton } from "@/components/ui/skeleton";

export function LoadingTypeDetails() {
	return (
		<div>
			<Skeleton className="h-8 w-16 mb-3" />
			<div className="flex flex-col gap-3">
				{Array.from({
					length: 4 /* Use this to repeat components/elements n times for cleaner code */,
				}).map((_, index) => (
					<div key={index}>
						<Skeleton className="h-4 w-24" />
					</div>
				))}
			</div>
		</div>
	);
}
