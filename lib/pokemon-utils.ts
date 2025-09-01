/**
 * Pokemon-specific utility functions for formatting, styling, and data manipulation
 */

export function getPokemonImageUrl(id: number): string {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatPokemonName(name: string): string {
	return name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ");
}

export function getTypeColor(type: string): string {
	const typeColors: Record<string, string> = {
		normal: "#A8A878",
		fire: "#F08030",
		water: "#6890F0",
		electric: "#F8D030",
		grass: "#78C850",
		ice: "#98D8D8",
		fighting: "#C03028",
		poison: "#A040A0",
		ground: "#E0C068",
		flying: "#A890F0",
		psychic: "#F85888",
		bug: "#A8B820",
		rock: "#B8A038",
		ghost: "#705898",
		dragon: "#7038F8",
		dark: "#705848",
		steel: "#B8B8D0",
		fairy: "#EE99AC",
	};
	return typeColors[type] || "#68A090";
}
