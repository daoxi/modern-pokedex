import { useQuery } from "@/hooks/use-query";
import { getAbilityDetails } from "@/lib/api";
import { Ability } from "@/types/pokemon";

export function useAbilityDetails(abilityName: string | null) {
	const { data, isLoading, error } = useQuery<Ability | null>(
		"ability",
		abilityName,
		getAbilityDetails
	);

	return {
		abilityDetails: data,
		isLoadingAbility: isLoading,
		errorAbility: error,
	};
}
