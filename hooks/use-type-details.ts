// Similar to use-ability-details

import { useQuery } from "@/hooks/use-query";
import { getTypeDetails } from "@/lib/api";
import { Type } from "@/types/pokemon";

export function useTypeDetails(typeName: string | null) {
	const { data, isLoading, error } = useQuery<Type | null>(
		"type",
		typeName,
		getTypeDetails
	);

	return {
		typeDetails: data,
		isLoadingType: isLoading,
		errorType: error,
	};
}
