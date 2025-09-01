"use client";

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
	const { abilityDetails, isLoadingAbility, errorAbility } =
		useAbilityDetails(abilityName);

	return (
		<>
			<div>
				{isLoadingDetails
					? "Loading pokemon details..."
					: abilityName
					? isLoadingAbility
						? "Loading ability details..."
						: abilityDetails
						? abilityDetails.effect_entries.find(
								(entry) => entry.language.name === "en"
						  ) //first check English description is available
							? abilityDetails.effect_entries.find(
									(entry) => entry.language.name === "en"
							  )?.effect
							: "English is not available for this ability"
						: errorAbility.message
					: errorDetails.message}
			</div>
		</>
	);
}
