// For loading fallback background in pokemon detailed info card (not including the pokemon image)

import { Skeleton } from "./ui/skeleton";

export function LoadingDetails() {
	return (
		<div>
			{/* Pokemon Height and Weight */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 mb-7">
				{Array.from({
					length: 2 /* use this to repeat components/elements n times for cleaner code */,
				}).map((_, index) => (
					<div key={index} className="flex justify-center">
						<div className="flex flex-col justify-start items-center gap-3">
							<Skeleton className="h-6 w-16" />
							<Skeleton className="h-8 w-24" />
						</div>
					</div>
				))}
			</div>
			{/* Pokemon Type(s) */}
			<div className="flex justify-center items-center gap-3 mb-7">
				<Skeleton className="h-8 w-24" />
			</div>
			{/* Pokemon Details */}
			{/* Pokemon Abilities */}
			<div className="mb-7">
				<div className="mb-4">
					<div className="flex flex-col gap-5">
						<Skeleton className="h-8 w-24" />
						{Array.from({
							length: 2 /* use this to repeat components/elements n times */,
						}).map((_, index) => (
							<div key={index} className="flex flex-col gap-3">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Pokemon Stats */}
			<div>
				<div className="mb-4">
					<Skeleton className="h-8 w-24" />
				</div>
				<div className="flex flex-col gap-6">
					{Array.from({
						length: 6 /* use this to repeat components/elements n times */,
					}).map((_, index) => (
						<div key={index}>
							<Skeleton className="h-4 w-full" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
