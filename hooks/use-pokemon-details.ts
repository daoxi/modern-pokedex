import { getPokemonDetails } from "@/lib/api";
import { useQuery } from "./use-query";

export function usePokemonDetails(nameOrId: string | null) {
	const { data, isLoading, error } = useQuery(
		"pokemon-details",
		nameOrId,
		getPokemonDetails
	);

	return {
		pokemonDetails: data,
		isLoadingDetails: isLoading,
		errorDetails: error,
	};
}

/* // Example from use-query.ts
 * // Basic usage
 * function useUserDetails(userId: string | null) {
 *   const { data, isLoading, error } = useQuery(
 *     'user',
 *     userId,
 *     (id) => fetchUser(id)
 *   );
 *   return { user: data, isLoading, error };
 * }
 */
