import { useQuery } from "@/hooks/use-query";
import { getPokemonList } from "@/lib/api";

export function usePokemonList() {
	const { data, isLoading, error } = useQuery(
		"pokemon-list",
		"all", // Using 'all' as a key since we're fetching all Pokemon
		async () => {
			const list = await getPokemonList();
			return list;
		}
	);

	return {
		pokemon: data,
		isLoading,
		error,
	};
}
