// For loading fallback background in enhanced preview section of pokemon cards
// Used for both when the enhanced preview is being lazy loaded and when it's waiting for pokemon details to be fetched

import { Skeleton } from "./ui/skeleton";

export function LoadingPreview() {
	return (
		<div>
			{/* Referred from the LoadingGrid component */}
			<div className="space-y-2">
				{/* Pokemon Type(s) */}
				<Skeleton className="h-6 w-16 mx-auto" />
				{/* Pokemon Abilities */}
				<div className="flex gap-2 justify-center">
					<Skeleton className="h-5 w-16" />
					<Skeleton className="h-5 w-16" />
				</div>
			</div>
		</div>
	);
}
