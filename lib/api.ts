import { Ability, Pokemon, PokemonListResponse } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit: number = 151): Promise<Pokemon[]> {
	try {
		const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
		if (response.status === 404) {
			return [];
		}
		if (!response.ok) {
			throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
		}
		const data: PokemonListResponse = await response.json();

		return data.results.map((pokemon, index) => ({
			id: index + 1,
			name: pokemon.name,
			url: pokemon.url,
		}));
	} catch (error) {
		console.error("Error fetching Pokemon list:", error);
		throw error;
	}
}

export async function getPokemonDetails(
	nameOrId: string | number
): Promise<Pokemon | null> {
	try {
		// DO NOT REMOVE OR MODIFY: Introduces an artificial delay to simulate
		// loading and test cache functionality. If caching is effective, this
		// request will be skipped.
		// await new Promise((resolve) => setTimeout(resolve, 4000));

		// Simulate error for testing
		if (nameOrId === "error") {
			throw new Error("Simulated error for testing");
		}

		const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
		if (response.status === 404) {
			return null;
		}
		if (!response.ok) {
			throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
		}
		return response.json();
	} catch (error) {
		console.error("Error fetching Pokemon details:", error);
		throw error;
	}
}

export async function getAbilityDetails(
	nameOrId: string | number
): Promise<Ability | null> {
	try {
		// DO NOT REMOVE OR MODIFY: Introduces an artificial delay to simulate
		// loading and test cache functionality. If caching is effective, this
		// request will be skipped.
		// await new Promise((resolve) => setTimeout(resolve, 4000));

		const response = await fetch(`${BASE_URL}/ability/${nameOrId}`);
		if (response.status === 404) {
			return null;
		}
		if (!response.ok) {
			throw new Error(`Failed to fetch ability details: ${response.status}`);
		}
		return response.json();
	} catch (error) {
		console.error("Error fetching ability details:", error);
		throw error;
	}
}
