"use client";

import { Skeleton } from "@/components//ui/skeleton";
import { useAbilityDetails } from "@/hooks/use-ability-details";

interface AbilityDescriptionProps {
	abilityName: string;
	isLoadingDetails: boolean;
	errorDetails: any;
}

export function AbilityDescription({
	abilityName,
	isLoadingDetails,
	errorDetails,
}: AbilityDescriptionProps) {
	// Use the custom hook to get ability details
	const { abilityDetails, isLoadingAbility, errorAbility } =
		useAbilityDetails(abilityName);

	return (
		<>
			<div>
				{isLoadingDetails ? (
					<div>Loading Pokémon details...</div>
				) : errorDetails ? (
					<div>
						⚠ Loading Pokémon details returned error: {errorDetails.message}
					</div>
				) : abilityName ? (
					isLoadingAbility ? (
						<Skeleton className="h-4 w-full" />
					) : abilityDetails ? (
						abilityDetails.effect_entries.find(
							(entry) => entry.language.name === "en" // Check English description is available
						) ? (
							abilityDetails.effect_entries.find(
								(entry) => entry.language.name === "en"
							)?.effect
						) : (
							<div>(English is not available for this ability.)</div>
						)
					) : errorAbility ? (
						<div>
							⚠ Loading ability description returned error:{" "}
							{errorAbility.message}
						</div>
					) : abilityDetails ===
					  null /* AbilityDetails being null implies 404 error due to how getAbilityDetails is designed */ ? (
						<div>⚠ Loading ability description returned error: 404</div>
					) : (
						<div>⚠ Failed to load ability description.</div>
					)
				) : (
					<div>⚠ Ability name is not received by this component.</div>
				)}
			</div>
		</>
	);
}
