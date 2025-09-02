export interface Pokemon {
	id: number;
	name: string;
	url: string;
	sprites?: {
		front_default: string;
		other: {
			"official-artwork": {
				front_default: string;
			};
		};
	};
	abilities?: Array<{
		ability: {
			name: string;
			url: string;
		};
		is_hidden: boolean;
		slot: number;
	}>;
	types?: Array<{
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}>;
	stats?: Array<{
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}>;
	height?: number;
	weight?: number;
}

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<{
		name: string;
		url: string;
	}>;
}

export interface Ability {
	id: number;
	name: string;
	effect_entries: Array<{
		effect: string;
		language: {
			name: string;
		};
	}>;
}
